import { Component } from '@angular/core';

@Component({
  selector: 'profile-layout',
  templateUrl: './profile-layout.component.html',
  styles: [``]
})
export class ProfileLayoutComponent {
  toggleValue = true;

  showOrHide(value:boolean){
    this.toggleValue = !this.toggleValue;
  }
}
