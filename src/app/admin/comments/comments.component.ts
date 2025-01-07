import { Component } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  // contact: Message = new Message();
  // class:string ="";

  // constructor(private MessageService: MessageService) { }

  // ngOnInit(): void {
  // }

  // getContacts(): Message[] {
  //   return this.MessageService.getContacts().reverse().slice(0,8);
  // }
  // saveContact(contact:Message):void{
  //   contact.id
  //     ? this.MessageService.updateContact(contact)
  //     : this.MessageService.createContact(contact);

  //   this.contact = new Message();
  // }
  // deleteContact(id:number):void{
  //   this.MessageService.deleteContact(id);
  // }
  // editContact(id:number):void{
  //   this.contact = this.MessageService.getContact(id)?? new Message();
  // }
  // cancel():void{
  //   this.contact = new Message();
  // }
  // colorOpacity(hex: string) {
  //   return hex+'30';
  // }
}

