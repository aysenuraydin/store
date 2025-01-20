import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { switchMap } from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styles: [``]
})
export class UsersComponent implements OnInit {
  buttonVisible:boolean = true;
  search:string = "";
  pageNumber:number = 1;
  pageSize:number = 9;
  pageTotal:number = 1;

  user:any;
  users: any[] = [];
  roles: Role[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  Search() {
    this.pageNumber=1;
    this.getQueryUsers();
  }
  onInputChange(event: Event) {
    this.pageNumber=1;
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryUsers();
  }
  Clear() {
    this.pageNumber=1;
    this.search = "";
    this.getUsers();
  }
  getQueryUsers(): void{
    this.userService.searchUsers(this.search, this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.users = data.products;
            this.pageTotal = data.totalPages;
        }
      );
  }
  onRoleChange(event: Event): void {
    const selectedRoleId = +(event.target as HTMLSelectElement).value;
    const selectedRole = this.roles.find(role => role.id === selectedRoleId);
      if (this.user && selectedRole?.color) {
        this.user.roleColor = selectedRole?.color;
      }
  }

  getRoles(): void{
    this.roleService.getAllRoles()
        .subscribe(
          (data) => {
            this.roles = data;
        }
      );
  }

  getUsers(): void{
    this.userService.getUsersWithRoleName(this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.users = data.products;
            this.pageTotal = data.totalPages;
        }
      );
      this.toggleWindow(false);
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getUsers();
    else this.getQueryUsers();
  }
  getUser(id:number):void{
    this.userService.getUserWithRoleName(id)
    .subscribe(
      (data) => {
        this.toggleWindow(true);
        this.user = data;
      }
    );
  }
  saveUser(id: number): void {
    this.userService.getUser(id).pipe(
      switchMap((data) => {
        data.roleId = Number(this.user.roleId);
        return this.userService.updateUser(data);
      })
    ).subscribe( d => {
      this.getUsers();
    });
  }
  deleteUser(id:number):void{
    this.userService.deleteUser(id)
    .subscribe(() => {
      this.getUsers();
    });
  }
  colorOpacity(color?: string) {
    return color ? `${color}33` : 'transparent';
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.user = new User();
  }
}


