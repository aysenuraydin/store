import { Component } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorValidators } from '../../Validators/color.validators';
import { validate } from 'uuid';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styles: [``]
})
export class RolesComponent {
  buttonVisible:boolean = true;
  search:string = "";
  role:Role = new Role();
  // roles:Role[] = [];
  roles:(Role & { usersLength: number })[] = [];
  pageNumber:number = 1;
  pageSize:number = 9;
  pageTotal:number = 1;

  isSubmitted = false;

  roleForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15)
              ]),
    color: new FormControl('', [Validators.required, ColorValidators.isValid]),
    createdAt: new FormControl(new Date()),
    action: new FormControl(''),
  });

  constructor(
    private roleService: RoleService,
    private userRoleService: UserRoleService,
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  Search() {
    this.pageNumber=1;
    this.getQueryRoles();
  }
  onInputChange(event: Event) {
    this.pageNumber=1;
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryRoles();
  }
  Clear() {
    this.pageNumber=1;
    this.search = "";
    this.getRoles();
  }
  getQueryRoles(): void{
    this.userRoleService.searchRoles(this.search,this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.roles = data.roles;
            this.pageTotal = data.totalPages;
        }
      );
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getRoles(): void{
    this.userRoleService.getRoles(this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.roles = data.roles;
            this.pageTotal = data.totalPages;
        }
      );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getRoles();
    else this.getQueryRoles();
  }
  getRole(id: number): void {
    this.roleService.getRole(id)
    .subscribe(
      (data) => {
        this.roleForm.patchValue({
          id:data.id,
          name: data.name,
          color: data.color,
          createdAt: data.createdAt
        });
      }
    );
    this.toggleWindow(true);
  }
  saveRole():void{
    if (this.roleForm.invalid) {
      this.isSubmitted = true;
      return;
    }
    switch(this.action){
      case 'add':
          this.createRole()
          break;
      case 'edit':
        this.updateRole()
            break;
      case 'delete':
          this.deleteRole();
            break;
      default:
          break;
    }
  }
  createRole():void{
    this.roleService.createRole(this.roleForm.value as Role)
    .subscribe(() => {
      this.getRoles();
      this.cancel();
    });
  }
  updateRole():void{
    this.roleService.updateRole(this.roleForm.value as Role)
    .subscribe(() => {
      this.getRoles();
      this.cancel();
    });
  }
  deleteRole():void{
    this.roleService.deleteRole(this.roleForm.value.id??0)
    .subscribe(() => {
      this.getRoles();
      this.cancel();
    });
  }

  cancel():void{
    this.isSubmitted = false;
    // this.sliderForm.reset();
    this.roleForm.reset({
      id: 0,
      name: '',
      color: '',
      createdAt: new Date(),
      action: '',
    });
  }
  colorOpacity(color?: string) {
    return color ? `${color}33` : 'transparent';
  }
  setAction(action: string) {
    this.roleForm.get('action')?.setValue(action);
  }
  get action() {
    return this.roleForm.get('action')?.value;
  }
  get hasValidId() {
    const id = this.roleForm.get('id')?.value;
    return Number(id) > 0;
  }
  get id() {
    return this.roleForm.get('id');
  }
  get name() {
    return this.roleForm.get('name');
  }
  get color() {
    return this.roleForm.get('color');
  }
}
