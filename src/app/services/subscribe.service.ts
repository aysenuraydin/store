import { Injectable } from '@angular/core';
import { SubscribeRepository } from '../repository/subscribe.repository';
import { Subscribe } from '../models/Subscribe';
import { map, Observable, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = 'api/subscribe';

  constructor (private http: HttpClient) { }

  getSubscribes() :Observable<Subscribe[]> {
    return this.http.get<Subscribe[]>(this.apiUrl).pipe(
      map(categories => categories)
    );
  }
  getSubscribe(id:number) : Observable<Subscribe>{
    return this.http.get<Subscribe>(this.apiUrl+'/'+id);
  }
  createSubscribe(subscribe: Subscribe): Observable<Subscribe> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getSubscribes().pipe(
      map(subscribes => {
        const lastId = subscribes.length > 0 ? subscribes.at(-1)?.id ?? 0 : 0;
        subscribe.id = lastId + 1;
        return subscribe;
      }),
      switchMap((updatedSubscribe) => {
        return this.http.post<Subscribe>(this.apiUrl, updatedSubscribe, httpOptions);
      })
    );
  }
  updateSubscribe(subscribe: Subscribe): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, subscribe, httpOptions)
  }
  deleteSubscribe(id: number): Observable<Subscribe>  {
    return this.http.delete<Subscribe>(this.apiUrl+'/'+id)
  }
}
