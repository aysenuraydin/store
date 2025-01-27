import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'api/message';

  constructor(private http: HttpClient) {  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  searchContacts(value: boolean ,query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ contacts: Message[]; totalPages: number }> {
    return this.getAllContacts(value).pipe(
        map(response => {
            const filteredContacts = response.filter(p =>
              [p.firstname, p.lastname, p.email, p.message, p.company]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedContacts = pageSize > 0 ? filteredContacts.reverse().slice(startIndex, startIndex + pageSize) : filteredContacts;
            const totalPages = Math.ceil(filteredContacts.length / pageSize);

            return { contacts: paginatedContacts, totalPages };
        }),
        catchError(this.handleError)
    );
  }

  getEveryContacts(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl).pipe(
      map(messages =>
        messages
          .map(m => ({
            ...m,
            message: m.message ? `${m.message.slice(0, 30)}...` : m.message,
          }))
      ),
      catchError(this.handleError)
    );
  }
  getAllContacts(value: boolean): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl).pipe(
      map(messages =>
        messages
          .filter(message =>
            value ? !message.isArchive : message.isArchive
          )
          .map(m => ({
            ...m,
            message: m.message ? `${m.message.slice(0, 30)}...` : m.message,
          }))
      ),
      catchError(this.handleError)
    );
  }
  getContacts(value: boolean ,pageNumber: number = 1, pageSize: number = 3): Observable<{ contacts: Message[]; totalPages: number }> {
    return this.getAllContacts(value).pipe(
        map(contacts => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedContacts = pageSize > 0 ? contacts.reverse().slice(startIndex, startIndex + pageSize) : contacts;
            const totalPages = Math.ceil(contacts.length / pageSize);

            return { contacts: paginatedContacts, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getContact(id:number) :Observable<Message>{
    return this.http.get<Message>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
  createContact(message: Message): Observable<Message> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getEveryContacts().pipe(
      map(messages => {
        const lastId = messages.length > 0 ? messages.at(-1)?.id ?? 0 : 0;
        message.id = lastId + 1;
        return message;
      }),
      switchMap((c) => {
        return this.http.post<Message>(this.apiUrl, c, httpOptions)
      }),
      catchError(this.handleError)
    );
  }
  updateContact(message: Message): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, message, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  deleteContact(id: number): Observable<Message>  {
    return this.http.delete<Message>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
}

