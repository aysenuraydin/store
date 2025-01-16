import { Component } from '@angular/core';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { InformationsService } from '../services/informations.service';
import { Info } from '../models/informations';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styles: [``]
})
export class ContactComponent {
  contact: Message = new Message();
  info: Info = new Info();

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
    saveContact(category:Message):void{
        this.MessageService.createContact(category).subscribe(() => {
          this.cancel();
        });
      }
    cancel():void{
      this.contact = new Message()
    }


}


