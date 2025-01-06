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
  class:string ="";

  constructor(private subscribeService: SubscribeService) { }

  ngOnInit(): void {
  }

  getSubscribes(): Subscribe[] {
    return this.subscribeService.getSubscribes().reverse().slice(0,8);
  }

  saveSubscribe(category:Subscribe):void{
    this.subscribeService.updateSubscribe(category)
    this.cancel();
  }
  deleteSubscribe(id:number):void{
    this.subscribeService.deleteSubscribe(id);
    this.cancel();
  }
  editSubscribe(id:number):void{
    this.subscribe = this.subscribeService.getSubscribe(id)?? new Subscribe();
  }
  cancel():void{
    this.subscribe = new Subscribe();
  }
}
