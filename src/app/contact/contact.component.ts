import { Component } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { InformationsService } from '../services/informations.service';
import { Info } from '../models/informations';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact: Contact = new Contact();
  info: Info = new Info();

    constructor(private informationsService: InformationsService,
      private contactService: ContactService) {}

    ngOnInit(): void {
      this.info = this.informationsService.getInfo();
    }

    saveContact(contact:Contact):void{
      this.contactService.createContact(contact);
      this.contact = new Contact();
    }

}
