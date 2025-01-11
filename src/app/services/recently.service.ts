import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { RecentlyItem } from '../models/recentlyItem';

@Injectable({
providedIn: 'root'
})
export class RecentlyService {
  private apiUrl:string = 'api/recently';

  constructor( private http: HttpClient) {  }

  getRecentlyItems(userId:number=0): Observable<RecentlyItem[]> {
      return this.http.get<RecentlyItem[]>(this.apiUrl).pipe(
        map(recently => recently)
      );
  }
  getRecentlyItem(id:number) : Observable<RecentlyItem>{
    return this.http.get<RecentlyItem>(this.apiUrl+'/'+id);
  }
  createRecentlyItem(recently: RecentlyItem): Observable<RecentlyItem> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getRecentlyItems().pipe(
      map(c => {
        const lastId = c.length > 0 ? c.at(-1)?.id ?? 0 : 0;
        recently.id = lastId + 1;
        return recently;
      }),
      switchMap((c) => {
        return this.http.post<RecentlyItem>(this.apiUrl, c, httpOptions);
      })
    );
  }
  updateRecentlyItem(recently: RecentlyItem): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, recently, httpOptions)
  }
  deleteRecentlyItem(id: number): Observable<RecentlyItem>  {
    return this.http.delete<RecentlyItem>(this.apiUrl+'/'+id)
  }
}









