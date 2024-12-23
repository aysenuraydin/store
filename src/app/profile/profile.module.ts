import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
