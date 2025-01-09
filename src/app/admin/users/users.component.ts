import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  buttonVisible:boolean = true;
  users:number[]= [1,2,3,4,5,6,7,8];

  ngOnInit(): void {
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
  }
}
