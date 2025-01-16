import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: (User & { confirmPassword?: string;}) = new User();

  constructor(private userService: UserService) { }

  createUser():void{
    console.log(this.user)
    this.userService.createUser(this.user)
    .subscribe(
      (data) => {
        this.user = new User();
      }
    );
  }
}
