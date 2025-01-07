import { Message } from "../models/message";

export class MessageRepository {
  private contact: Message[];

  constructor() {
      this.contact = new Array<Message>(
          { id:1, firstname: 'Aysenur', lastname: 'Aydın',  company: 'Aysenur Aydın Mimarlık', email: 'ays1@ayd.com', phoneNumber: 123456789 ,message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ea!', createdAt: new Date(), isArchive:false, isAccept:true},
          { id:2, firstname: 'Aysenur', lastname: 'Aydın',  company: 'Aysenur Aydın Mimarlık', email: 'ays2@ayd.com', phoneNumber: 123456789 ,message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ea!', createdAt: new Date(), isArchive:true, isAccept:true},
          { id:3, firstname: 'Aysenur', lastname: 'Aydın',  company: 'Aysenur Aydın Mimarlık', email: 'ays3@ayd.com', phoneNumber: 123456789 ,message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ea!', createdAt: new Date(), isArchive:true, isAccept:true},
          { id:4, firstname: 'Aysenur', lastname: 'Aydın',  company: 'Aysenur Aydın Mimarlık', email: 'ays4@ayd.com', phoneNumber: 123456789 ,message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ea!', createdAt: new Date(), isArchive:false, isAccept:true},
          { id:5, firstname: 'Aysenur', lastname: 'Aydın',  company: 'Aysenur Aydın Mimarlık', email: 'ays5@ayd.com', phoneNumber: 123456789 ,message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ea!', createdAt: new Date(), isArchive:false, isAccept:true},
          { id:6, firstname: 'Aysenur', lastname: 'Aydın',  company: 'Aysenur Aydın Mimarlık', email: 'ays6@ayd.com', phoneNumber: 123456789 ,message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ea!', createdAt: new Date(), isArchive:false, isAccept:true},
      );
  }
  getContacts(): Message[] {
    return this.contact;
}
}

