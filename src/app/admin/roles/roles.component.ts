import { Component } from '@angular/core';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  buttonVisible:boolean = true;
  roles:number[]= [1,2,3,4];

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    // this.cancel();
  }
}
