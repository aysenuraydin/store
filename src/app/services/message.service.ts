import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { MessageRepository } from '../repository/message.repository';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private dataSource: MessageRepository;
    private contacts: Message[];

    constructor(private http: HttpClient) {
      this.dataSource = new MessageRepository();
      this.contacts = new Array<Message>();

      this.dataSource.getContacts().forEach(p => this.contacts.push(p));
    }

    getContacts() :Message[] {
      return this.contacts.filter(i=>!i.isArchive && i.isAccept).map(contact => {
        return {
          ...contact,
          message: contact.message?.slice(0,30)+'...'
        }
      })
    }
    getArchivedContacts() :Message[] {
      return this.contacts.filter(i=>i.isArchive && i.isAccept).map(contact => {
        return {
          ...contact,
          message: contact.message?.slice(0,30)+'...'
        }
      })
    }
    getContact(id:number) :Message | undefined {
      return this.contacts.find(i=>i.id==id);
    }
    createContact(contact: Message): void{
      prompt(contact.firstname)
      contact.id=(this.contacts.at(-1)?.id?? 0) + 1;
      this.contacts.push(contact);
    }
    updateContact(contact: Message): void {
      const index = this.contacts.findIndex(p => p.id === contact.id);
      if (index !== -1) {
        this.contacts[index] = contact;
      }
    }
    deleteContact(id: number): void {
      const index = this.contacts.findIndex(p => p.id === id);
      if (index !== -1) {
        this.contacts.splice(index, 1);
      }
    }

}

