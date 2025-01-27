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
  pageNumber:number = 1;
  pageSize:number = 7;
  pageTotal:number = 1;

  constructor(private messageService: MessageService ) { }

  ngOnInit(): void {
    this.showMessages(this.showOrHide);
  }

  Search() {
    this.pageNumber=1;
    this.getQueryMessages();
  }
  onInputChange(event: Event) {
    this.pageNumber=1;
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryMessages();
  }
  Clear() {
    this.pageNumber=1;
    this.search = "";
    this.showMessages(this.showOrHide);
  }
  getQueryMessages(): void{
      this.messageService.searchContacts(this.showOrHide,this.search,this.pageNumber, this.pageSize)
          .subscribe(
            (data) => {
              this.messages = data.contacts;
              this.pageTotal = data.totalPages;
          }
        );
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  showMessages(value:boolean): void {
    this.toggleWindow(false);
    if(this.showOrHide!=value){
      this.pageNumber= 1;
      this.showOrHide = value;
    }
    if(this.search.length==0){
      this.messageService.getContacts(value,this.pageNumber, this.pageSize)
      .subscribe(
        (data) => {
          this.messages = data.contacts;
          this.pageTotal = data.totalPages;
      }
    );
    }else this.getQueryMessages();
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.showMessages(this.showOrHide);
    else this.getQueryMessages();
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

