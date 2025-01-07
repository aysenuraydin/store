import { Component } from '@angular/core';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { InformationsService } from '../services/informations.service';
import { Info } from '../models/informations';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact: Message = new Message();
  info: Info = new Info();

    constructor(private informationsService: InformationsService,
      private MessageService: MessageService) {}

    ngOnInit(): void {
      this.info = this.informationsService.getInfo();
    }

    saveContact(contact:Message):void{
      this.MessageService.createContact(contact);
      this.contact = new Message();
    }

}
