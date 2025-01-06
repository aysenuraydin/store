import { Component } from '@angular/core';
import { Subscribe } from '../../models/Subscribe';
import { SubscribeService } from '../../services/subscribe.service';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  subscribe: Subscribe = new Subscribe();

  constructor(private subscribeService: SubscribeService) {}

  saveSubscribe(prd:Subscribe):void{
    this.subscribeService.createSubscribe(prd);
    this.subscribe = new Subscribe();
  }
}

