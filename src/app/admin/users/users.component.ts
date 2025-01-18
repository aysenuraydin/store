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
    this.getQueryUsers();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryUsers();
  }
  Clear() {
    this.search = "";
    this.getUsers();
  }
  getQueryUsers(): void{
    this.userService.searchUsers(this.search)
        .subscribe(
          (data) => {
            this.users = data;
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
    this.roleService.getRoles()
        .subscribe(
          (data) => {
            this.roles = data;
        }
      );
  }

  getUsers(): void{
    this.userService.getUsersWithRoleName()
        .subscribe(
          (data) => {
            this.users = data;
        }
      );
      this.toggleWindow(false);
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


