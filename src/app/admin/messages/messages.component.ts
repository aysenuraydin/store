import { Component } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  contact: Message = new Message();
  contacts: Message[] = [];
  class:string ="";
  showOrHide:boolean = true;

  constructor(private MessageService: MessageService) { }

  ngOnInit(): void {
    this.contacts = this.getContacts();
    this.showOrHide = true;
  }

  getContacts(): Message[] {
    return this.MessageService.getContacts().reverse().slice(0,8);
  }
  getArchivedContacts(): Message[] {
    return this.MessageService.getArchivedContacts().reverse().slice(0,8);
  }

  showMessages(value:boolean): Message[] {
    this.showOrHide = value;
    if(value)  return this.contacts = this.getContacts();
    else return this.contacts = this.getArchivedContacts();
  }
  saveContact(contact:Message):void{
    this.MessageService.updateContact(contact);
    this.contacts = this.showMessages(this.showOrHide);
    this.cancel();
  }
  deleteContact(id:number):void{
    this.MessageService.deleteContact(id);
    this.contacts = this.showMessages(this.showOrHide);
    this.cancel();
  }
  archivedContact(contact:Message):void{
    contact.isArchive = !contact.isArchive;
    this.MessageService.updateContact(contact);
    this.contacts = this.showMessages(this.showOrHide);
    this.cancel();
  }
  viewContact(id:number):void{
    this.contact = this.MessageService.getContact(id)?? new Message();
  }
  cancel():void{
    this.contact = new Message();
  }
  colorOpacity(hex: string) {
    return hex+'30';
  }
}

