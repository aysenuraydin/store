import { Component } from '@angular/core';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  buttonVisible:boolean = true;
  comments:number[]= [1,2,3,4,5,6,7,8];

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    // this.cancel();
  }
}

