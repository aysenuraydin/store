import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  message: string ="";
  user: {email:string;password:string} = {email:"", password:""};

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
  ) { }

  login(): void {
    setTimeout(() => {
      this.userService.userLogin(this.user.email, this.user.password).subscribe();
      this.router.navigate(['/home']);
    }, 1000);
  }
}
