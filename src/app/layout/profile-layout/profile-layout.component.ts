import { Component } from '@angular/core';

@Component({
  selector: 'profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrl: './profile-layout.component.css'
})
export class ProfileLayoutComponent {
  toggleValue = true;

  showOrHide(value:boolean){
    this.toggleValue = !this.toggleValue;
  }
}
