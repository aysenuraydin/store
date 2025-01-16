import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountLayoutComponent } from "../layout/account-layout/account-layout.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AuthGuard } from "../guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AccountLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }

