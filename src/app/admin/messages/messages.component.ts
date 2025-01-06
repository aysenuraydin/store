import { Component } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  contact: Contact = new Contact();
  class:string ="";

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  getContacts(): Contact[] {
    return this.contactService.getContacts().reverse().slice(0,8);
  }
  saveContact(contact:Contact):void{
    this.contactService.updateContact(contact);
    this.cancel();
  }
  deleteContact(id:number):void{
    this.contactService.deleteContact(id);
    this.cancel();
  }
  archivedContact(contact:Contact):void{
    contact.isArchive = !contact.isArchive;
    this.contactService.updateContact(contact);
    this.cancel();
  }
  viewContact(id:number):void{
    this.contact = this.contactService.getContact(id)?? new Contact();
  }
  cancel():void{
    this.contact = new Contact();
  }
  colorOpacity(hex: string) {
    return hex+'30';
  }
}

