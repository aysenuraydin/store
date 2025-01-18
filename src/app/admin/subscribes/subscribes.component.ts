
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

  constructor(private subscribeService: SubscribeService) { }

  ngOnInit(): void {
    this.getSubscribes();
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  Search() {
    this.getQuerySubscribes();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQuerySubscribes();
  }
  Clear() {
    this.search = "";
    this.getSubscribes();
  }
  getQuerySubscribes(): void{
      this.subscribeService.searchSubscribes(this.search)
          .subscribe(
            (data) => {
              this.subscribes = data;
          }
        );
  }

  getSubscribes(): void {
      this.subscribeService.getSubscribes()
        .subscribe(
          (data) => {
            this.subscribes = data.reverse().slice(0,9);
            this.toggleWindow(true);
        }
      );
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


