import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { AdressItem } from '../models/adressItem';
@Injectable({
providedIn: 'root'
})
export class AdressItemService {
  private apiUrl:string = 'api/adress';

  constructor( private http: HttpClient) {  }

  getAdressItems(userId:number=0): Observable<AdressItem[]> {
      return this.http.get<AdressItem[]>(this.apiUrl).pipe(
        map(adress => adress)
      );
  }
  getAdressItem(id:number) : Observable<AdressItem>{
    return this.http.get<AdressItem>(this.apiUrl+'/'+id);
  }
  createAdressItem(adress: AdressItem): Observable<AdressItem> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getAdressItems().pipe(
      map(c => {
        const lastId = c.length > 0 ? c.at(-1)?.id ?? 0 : 0;
        adress.id = lastId + 1;
        return adress;
      }),
      switchMap((c) => {
        return this.http.post<AdressItem>(this.apiUrl, c, httpOptions);
      })
    );
  }
  updateAdressItem(adress: AdressItem): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, adress, httpOptions)
  }
  deleteAdressItem(id: number): Observable<AdressItem>  {
    return this.http.delete<AdressItem>(this.apiUrl+'/'+id)
  }
}









