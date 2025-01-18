import { Component } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styles: [``]
})
export class RolesComponent {
  buttonVisible:boolean = true;
  search:string = "";
  role:Role = new Role();
  roles:Role[] = [];

  constructor(
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  Search() {
    this.getQueryRoles();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryRoles();
  }
  Clear() {
    this.search = "";
    this.getRoles();
  }
  getQueryRoles(): void{
    this.roleService.searchRoles(this.search)
        .subscribe(
          (data) => {
            this.roles = data;
        }
      );
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  getRoles(): void{
    this.roleService.getRoles()
        .subscribe(
          (data) => {
            this.roles = data;
        }
      );
  }
  getRole(id:number):void{
    this.roleService.getRole(id)
    .subscribe(
      (data) => {
        this.toggleWindow(true);
        this.role = data;
      }
    );
  }
  saveRole(role:Role):void{
    this.updateRole(role);
    this.cancel();
  }
  updateRole(role:Role):void{
    this.roleService.updateRole(role)
    .subscribe(() => {
      this.getRoles();
    });
  }
  deleteRole(id:number):void{
    this.roleService.deleteRole(id)
    .subscribe(() => {
      this.getRoles();
    });
    this.cancel();
  }

  cancel():void{
    this.role = new Role();
  }
  colorOpacity(color?: string) {
    return color ? `${color}33` : 'transparent';
  }
}
