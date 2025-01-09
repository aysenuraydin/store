import { Component } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  message: Message = new Message();
  messages: Message[] = [];
  showOrHide:boolean = true;
  buttonVisible:boolean = true;

  constructor(private messageService: MessageService ) { }

  ngOnInit(): void {
    this.showMessages(this.showOrHide);
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  showMessages(value:boolean): void {
    this.showOrHide = value;
    this.messageService.getContacts(value)
      .subscribe(
        (data) => {
          this.messages = data.reverse().slice(0,9);
      }
    );
  }
  viewMessage(id: number): void {
    this.messageService.getBanner(id)
    .subscribe(
      (data) => {
        this.message = data;
      }
    );
  }
  createMessages(message: Message): void {
    this.messageService.createContact(message).subscribe(() => {
      this.showMessages(this.showOrHide);
      this.cancel();
    });
  }
  saveMessage(message:Message):void{
    this.messageService.updateContact(message).subscribe(() => {
      this.showMessages(this.showOrHide);
      this.cancel();
    });
  }
  archivedMessage(message:Message):void{
    message.isArchive = !message.isArchive;
    this.messageService.updateContact(message).subscribe(() => {
      this.showMessages(this.showOrHide);
      this.cancel();
    });
  }
  deleteMessage(id: number): void {
    this.messageService.deleteContact(id).subscribe();
    this.showMessages(this.showOrHide);
    this.cancel();
  }

  cancel():void{
    this.message = new Message();
  }
  colorOpacity(hex: string) {
    return hex+'30';
  }
}

