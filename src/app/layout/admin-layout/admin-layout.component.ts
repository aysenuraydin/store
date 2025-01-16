import { Component } from '@angular/core';

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html',
  styles: [``]
})
export class AdminLayoutComponent {

  toggleValue = true;

  showOrHide(value:boolean){
    this.toggleValue = !this.toggleValue;
  }

}
