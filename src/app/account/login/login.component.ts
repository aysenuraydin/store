import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  message: string ="";
  user: {email:string;password:string} = {email:"", password:""};
  isSubmitted = false;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })
  constructor(
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
  ) { }

  login(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    setTimeout(() => {
      this.userService.userLogin(this.email?.value ||'', this.password?.value ||'').subscribe(data =>{
        if(data){
          this.router.navigate(['/home']);
        }
        else{
          this.message="User not found. Email or password is incorrect."
        }
        this.clearForm()
      });
    }, 1000);
  }
  clearForm() {
    this.isSubmitted = false;
    this.loginForm.reset();
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get("password");
  }
}
