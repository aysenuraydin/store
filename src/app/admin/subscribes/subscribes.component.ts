
import { Component } from '@angular/core';
import { Subscribe } from '../../models/Subscribe';
import { SubscribeService } from '../../services/subscribe.service';

@Component({
  selector: 'subscribes',
  templateUrl: './subscribes.component.html',
  styleUrl: './subscribes.component.css'
})
export class SubscribesComponent {
  subscribe: Subscribe = new Subscribe();
  subscribes: Subscribe[] = [];
  buttonVisible:boolean = false;

  constructor(private subscribeService: SubscribeService) { }

  ngOnInit(): void {
    this.getSubscribes();
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  getSubscribes(): void {
      this.subscribeService.getSubscribes()
        .subscribe(
          (data) => {
            this.subscribes = data.reverse().slice(0,9);
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
  }
  createSubscribe(subscribe:Subscribe):void{
    this.subscribeService.createSubscribe(subscribe).subscribe();
    this.getSubscribes();
    this.cancel();
  }
  saveSubscribe(subscribe:Subscribe):void{
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


