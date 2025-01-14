import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { FavItem } from '../models/favItem';
import { ProductList } from '../models/productList';
import { ProductService } from './product.service';
@Injectable({
providedIn: 'root'
})
export class FavService {
  private apiUrl:string = 'api/fav';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    ) {}

  getFavItems(userId:number=0): Observable<FavItem[]> {
      return this.http.get<FavItem[]>(this.apiUrl).pipe(
        map(fav => fav)
      );
  }
  createFavItem(fav: ProductList): Observable<FavItem> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getFavItems().pipe(
      map(c => {
        // const lastId = c.length > 0 ? c.at(-1)?.id ?? 0 : 0;
        // fav.id = lastId + 1;
        return fav;
      }),
      switchMap((c) => {
        return this.http.post<FavItem>(this.apiUrl, c, httpOptions);
      })
    );
  }
  deleteFavItem(id: number): Observable<FavItem>  {
    return this.http.delete<FavItem>(this.apiUrl+'/'+id)
  }
}









