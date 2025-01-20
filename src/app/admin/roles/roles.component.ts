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
  pageNumber:number = 1;
  pageSize:number = 9;
  pageTotal:number = 1;

  constructor(
    private roleService: RoleService,
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
    this.roleService.searchRoles(this.search,this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.roles = data.products;
            this.pageTotal = data.totalPages;
        }
      );
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  getRoles(): void{
    this.roleService.getRoles(this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.roles = data.products;
            this.pageTotal = data.totalPages;
        }
      );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getRoles();
    else this.getQueryRoles();
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
