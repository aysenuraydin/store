import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from '../models/message';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageResolver implements Resolve<Message[]> {
  constructor(private messageService: MessageService) {}

  resolve(): Observable<Message[]> {
    return this.messageService.getAllContacts();
  }
}
