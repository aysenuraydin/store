
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

  constructor(private subscribeService: SubscribeService) { }

  ngOnInit(): void {
    this.getSubscribes();
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
  createSubscribe(prd:Subscribe):void{
    this.subscribeService.createSubscribe(prd).subscribe();
    this.getSubscribes();
    this.cancel();
  }
  saveSubscribe(category:Subscribe):void{
    this.subscribeService.updateSubscribe(category).subscribe();
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


