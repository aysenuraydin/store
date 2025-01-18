import { Component } from '@angular/core';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styles: [``]
})
export class MessagesComponent {
  message: Message = new Message();
  messages: Message[] = [];
  showOrHide:boolean = true;
  buttonVisible:boolean = true;
  search:string = "";

  constructor(private messageService: MessageService ) { }

  ngOnInit(): void {
    this.showMessages(this.showOrHide);
  }

  Search() {
    this.getQueryMessages();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryMessages();
  }
  Clear() {
    this.search = "";
    this.showMessages(this.showOrHide);
  }
  getQueryMessages(): void{
      this.messageService.searchContacts(this.search)
          .subscribe(
            (data) => {
              this.messages = data;
          }
        );
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  showMessages(value:boolean): void {
    this.toggleWindow(false);
    this.showOrHide = value;
    this.messageService.getContacts(value)
      .subscribe(
        (data) => {
          this.messages = data.reverse().slice(0,9);
      }
    );
  }
  viewMessage(id: number): void {
    this.messageService.getContact(id)
    .subscribe(
      (data) => {
        this.toggleWindow(true);
        this.message = data;
      }
    );
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

