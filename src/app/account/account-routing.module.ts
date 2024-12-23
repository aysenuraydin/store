import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountLayoutComponent } from "../layout/account-layout/account-layout.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

// const routes: Routes = [
//   {
//       path: '',
//       component: ProductComponent,
//       canActivate: [],
//       children: [
//         { path: '', component: ProductComponent,
//         }
//       ]
//     },
//     { path: 'product-list', component: ProductListComponent },
//     { path: 'product-detail', component: ProductDetailComponent }
// ]
const routes: Routes = [
  {
    path: '',
    component: AccountLayoutComponent,
    canActivate: [],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }

