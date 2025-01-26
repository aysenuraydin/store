import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, pipe, switchMap, throwError } from 'rxjs';
import { AdressItem } from '../models/adressItem';
import { AuthService } from './auth.service';
@Injectable({
providedIn: 'root'
})
export class AdressItemService {
  private apiUrl:string = 'api/adress';

  constructor( private http: HttpClient, private authService: AuthService) {  }

  private handleError(error: any): Observable<never> {
    const errorMessage = error.error?.message || 'error';
    return throwError(() => new Error(errorMessage));
  }
  getAdressItems(): Observable<AdressItem[]> {
    const currentUser = this.authService.getUser();

    return this.http.get<AdressItem[]>(this.apiUrl).pipe(
      map(adress => adress.filter(i=>i.userId==currentUser?.id)),
      catchError(this.handleError)
    );
  }

  getAdressItem(id:number) : Observable<AdressItem>{
    return this.http.get<AdressItem>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
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
        c.userId = this.authService.getUser()?.id
        return this.http.post<AdressItem>(this.apiUrl, c, httpOptions);
      }),
      catchError(this.handleError)
    );
  }
  updateAdressItem(adress: AdressItem): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, adress, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  deleteAdressItem(id: number): Observable<AdressItem>  {
    return this.http.delete<AdressItem>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
}
