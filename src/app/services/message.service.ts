import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'api/message';

  constructor(private http: HttpClient) {  }

  searchContacts(value: boolean ,query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Message[]; totalPages: number }> {
    return this.getAllContacts(value).pipe(
        map(response => {
            const filteredProducts = response.filter(p =>
              [p.firstname, p.lastname, p.email, p.message, p.company]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
            const totalPages = Math.ceil(filteredProducts.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
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
      )
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
      )
    );
  }
  getContacts(value: boolean ,pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Message[]; totalPages: number }> {
    return this.getAllContacts(value).pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
    );
  }
  getContact(id:number) :Observable<Message>{
    return this.http.get<Message>(this.apiUrl+'/'+id);
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
      })
    );
  }
  updateContact(message: Message): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, message, httpOptions)
  }
  deleteContact(id: number): Observable<Message>  {
    return this.http.delete<Message>(this.apiUrl+'/'+id)
  }
}

