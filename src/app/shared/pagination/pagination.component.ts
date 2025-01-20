import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input()  pageNumber:number = 1;
  @Input()  pageTotal:number = 1;
  @Output() newPageNumber = new EventEmitter<number>();

  goPage(pageNumber:number){
    if(pageNumber!=0 && pageNumber<= this.pageTotal){
      this.newPageNumber.emit(pageNumber);
      this.pageNumber = pageNumber
    }
  }
}
