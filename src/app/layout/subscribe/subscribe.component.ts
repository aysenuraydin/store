import { Component } from '@angular/core';
import { Subscribe } from '../../models/Subscribe';
import { SubscribeService } from '../../services/subscribe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styles: [``]
})
export class SubscribeComponent {
  subscribe: Subscribe = new Subscribe();
  isSubmitted = false;

  subscribeForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.minLength(5), Validators.email])
  })

  constructor(private subscribeService: SubscribeService) {}

  saveSubscribe():void{
    this.isSubmitted = true;
    if (this.subscribeForm.invalid) return;

    const subscribe = new Subscribe();
    subscribe.email= this.subscribeForm.value.email || '',

    this.subscribeService.createSubscribe(subscribe)
    .subscribe(() =>  this.clearForm());
  }
  clearForm() {
    this.isSubmitted = false;
    this.subscribeForm.reset();
  }
  get email(){
    return this.subscribeForm.get("email");
  }
}

