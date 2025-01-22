import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { BannersComponent } from './banners/banners.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarItemComponent } from './admin-layout/sidebar-item/sidebar-item.component';


@NgModule({
  declarations: [
    AccountLayoutComponent,
    AdminLayoutComponent,
    SidebarItemComponent,
    ProfileLayoutComponent,
    UserLayoutComponent,
    BannersComponent,
    FooterComponent,
    NavbarComponent,
    SubscribeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    BannersComponent
  ],
})
export class LayoutModule {}
