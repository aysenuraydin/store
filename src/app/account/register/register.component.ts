import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isSubmitted = false;

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5),Validators.maxLength(12)]),
    surname: new FormControl("", [Validators.required, Validators.minLength(5),Validators.maxLength(12)]),
    phone: new FormControl(0, [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  })

  constructor(private userService: UserService, public router: Router) { }

  createUser(): void {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const user = new User()
    user.name= this.registerForm.value.name || '',
    user.surname= this.registerForm.value.surname || '',
    user.phone= this.registerForm.value.phone || 0,
    user.email= this.registerForm.value.email || '',
    user.password= this.registerForm.value.password || '',

    setTimeout(() => {
      this.userService.createUser(user).subscribe(data =>{
          this.router.navigate(['/account/login']);
          this.clearForm()
      });
    }, 1000);
  }
  clearForm() {
    this.isSubmitted = false;
    this.registerForm.reset();
  }
  get name(){
    return this.registerForm.get('name');
  }
  get surname(){
    return this.registerForm.get('surname');
  }
  get phone(){
    return this.registerForm.get('phone');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
}
