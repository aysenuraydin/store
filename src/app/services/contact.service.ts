import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactRepository } from '../repository/contact.repository';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    private dataSource: ContactRepository;
    private contacts: Contact[];

    constructor() {
      this.dataSource = new ContactRepository();
      this.contacts = new Array<Contact>();

      this.dataSource.getContacts().forEach(p => this.contacts.push(p));
    }

    getContacts() :Contact[] {
      return this.contacts.filter(i=>!i.isArchive && i.isAccept).map(contact => {
        return {
          ...contact,
          message: contact.message?.slice(0,30)+'...'
        }
      })
    }
    getArchivedContacts() :Contact[] {
      return this.contacts.filter(i=>i.isArchive && i.isAccept).map(contact => {
        return {
          ...contact,
          message: contact.message?.slice(0,30)+'...'
        }
      })
    }
    getContact(id:number) :Contact | undefined {
      return this.contacts.find(i=>i.id==id);
    }
    createContact(contact: Contact): void{
      contact.id=(this.contacts.at(-1)?.id?? 0) + 1;
      this.contacts.push(contact);
    }
    updateContact(contact: Contact): void {
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

