import { Component } from '@angular/core';
import { Message } from '../models/message';
import { Info } from '../models/informations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InformationsService } from '../services/informations.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styles: [``]
})
export class ContactComponent {
  contact: Message = new Message();
  info: Info = new Info();
  isSubmitted = false;

  contactForm = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.minLength(5)]),
    lastname: new FormControl("", [Validators.required, Validators.minLength(5)]),
    company: new FormControl(""),
    message: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl("", [Validators.required, Validators.minLength(5),Validators.email]),
    phoneNumber: new FormControl("", [Validators.required]),
    isAccept: new FormControl("", [Validators.required])
  })

    constructor(
      private informationsService: InformationsService,
      private MessageService: MessageService
    ) {}

    ngOnInit(): void {
      this.getInfo();
    }

    getInfo(): void {
      this.informationsService.getInfo()
      .subscribe(
        (data) => {
          this.info = data;
        }
      );
    }
    saveContact():void{
      this.isSubmitted = true;
      if (this.contactForm.invalid) return;

      const message = new Message();
        message.firstname= this.contactForm.value.firstname || '',
        message.lastname= this.contactForm.value.lastname || '',
        message.company= this.contactForm.value.company || '',
        message.email= this.contactForm.value.email || '',
        message.phoneNumber= Number(this.contactForm.value.phoneNumber) || 0,
        message.message= this.contactForm.value.message || '',
        message.isAccept= !!this.contactForm.value.isAccept || false

      this.MessageService.createContact(message)
      .subscribe(() =>  this.clearForm());
    }
    clearForm() {
      this.isSubmitted = false;
      this.contactForm.reset();
    }
    get firstname(){
      return this.contactForm.get('firstname');
    }
    get lastname() {
      return this.contactForm.get("lastname");
    }
    get company(){
      return this.contactForm.get("company");
    }
    get message(){
      return this.contactForm.get("message");
    }
    get email(){
      return this.contactForm.get("email");
    }
    get phoneNumber(){
      return this.contactForm.get("phoneNumber");
    }
    get isAccept(){
      return this.contactForm.get("isAccept");
    }

}


