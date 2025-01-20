
import { Component } from '@angular/core';
import { Subscribe } from '../../models/Subscribe';
import { SubscribeService } from '../../services/subscribe.service';

@Component({
  selector: 'subscribes',
  templateUrl: './subscribes.component.html',
  styles: [``]
})
export class SubscribesComponent {
  subscribe: Subscribe = new Subscribe();
  subscribes: Subscribe[] = [];
  buttonVisible:boolean = false;
  search:string = "";
  pageNumber:number = 1;
  pageSize:number = 8;
  pageTotal:number = 1;
  constructor(private subscribeService: SubscribeService) { }

  ngOnInit(): void {
    this.getSubscribes();
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  Search() {
    this.pageNumber=1;
    this.getQuerySubscribes();
  }
  onInputChange(event: Event) {
    this.pageNumber=1;
    this.search = (event.target as HTMLInputElement).value;
    this.getQuerySubscribes();
  }
  Clear() {
    this.pageNumber=1;
    this.search = "";
    this.getSubscribes();
  }
  getQuerySubscribes(): void{
      this.subscribeService.searchSubscribes(this.search,this.pageNumber, this.pageSize)
          .subscribe(
            (data) => {
              this.subscribes = data.products;
              this.pageTotal = data.totalPages;
          }
        );
  }
  getSubscribes(): void {
      this.subscribeService.getSubscribes(this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.subscribes = data.products;
            this.pageTotal = data.totalPages;
            this.toggleWindow(true);
        }
      );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getSubscribes();
    else this.getQuerySubscribes();
  }
  editSubscribe(id: number): void {
    this.subscribeService.getSubscribe(id)
    .subscribe(
      (data) => {
        this.subscribe = data;
      }
    );
    this.toggleWindow(false);
  }
  saveSubscribe(subscribe:Subscribe):void{
    subscribe.isActive=!subscribe.isActive;
    this.subscribeService.updateSubscribe(subscribe).subscribe();
    this.getSubscribes();
    this.cancel();
  }
  deleteSubscribe(id: number): void {
    this.subscribeService.deleteSubscribe(id).subscribe();
    this.getSubscribes();
    this.cancel();
  }
  cancel():void{
    this.subscribe = new Subscribe();
  }
}


