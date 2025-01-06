import { Component } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  // contact: Contact = new Contact();
  // class:string ="";

  // constructor(private contactService: ContactService) { }

  // ngOnInit(): void {
  // }

  // getContacts(): Contact[] {
  //   return this.contactService.getContacts().reverse().slice(0,8);
  // }
  // saveContact(contact:Contact):void{
  //   contact.id
  //     ? this.contactService.updateContact(contact)
  //     : this.contactService.createContact(contact);

  //   this.contact = new Contact();
  // }
  // deleteContact(id:number):void{
  //   this.contactService.deleteContact(id);
  // }
  // editContact(id:number):void{
  //   this.contact = this.contactService.getContact(id)?? new Contact();
  // }
  // cancel():void{
  //   this.contact = new Contact();
  // }
  // colorOpacity(hex: string) {
  //   return hex+'30';
  // }
}

