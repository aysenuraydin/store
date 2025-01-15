import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, pipe, switchMap } from 'rxjs';
import { RecentlyItem } from '../models/recentlyItem';
import { ProductList } from '../models/productList';
import { ProductService } from './product.service';
import { FavService } from './fav.service';

@Injectable({
providedIn: 'root'
})
export class RecentlyService {
  private apiUrl:string = 'api/recently';

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private favService: FavService
  ) {  }

  getRecentlyItems(): Observable<ProductList[]> {
    return this.http.get<RecentlyItem[]>(this.apiUrl).pipe(
      switchMap((recentlyItems: RecentlyItem[]) => {
        const neededCount = 4 - recentlyItems.length;
        if (neededCount > 0) {
          return this.productService.getProductsByCount(neededCount).pipe(
            map((extraProducts) => {
              const extraRecentlyItems = extraProducts;
              return [...recentlyItems.reverse(), ...extraRecentlyItems];
            })
          );
        }
        return of(recentlyItems.reverse());
      }),
      switchMap((products) => {
        const productsWithFavStatus$ = products.map((product) =>
          this.favService.isOrNot(product.id).pipe(
            map((isFav) => ({
              id: product.id,
              name: product.name,
              price: product.price,
              imgUrl: product.imgUrl,
              isFav: isFav,
            }))
          )
        );
        return forkJoin(productsWithFavStatus$);
      })
    );
  }

  getRecentlyItems2(userId: number = 0): Observable<ProductList[]> {
    return this.http.get<RecentlyItem[]>(this.apiUrl).pipe(
      switchMap(recently => {
        const neededCount = 4 - recently.length;

        if (neededCount > 0 && neededCount != 4) {
          return this.productService.getProductsByCount(neededCount).pipe(
            map(extraProducts => {
              const extraRecentlyItems = extraProducts.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                imgUrl: product.imgUrl,
                categoryId: product.categoryId,
                // isFav: product.isFav,
              } as ProductList));
              return [...recently.reverse(),...extraRecentlyItems];
            })
          );
        }
        return [recently.reverse()];
      })
    );
  }
  createRecentlyItem(recently: ProductList): Observable<RecentlyItem> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.getRecentlyItems().pipe(
      switchMap(products => {
        const isDuplicate = products.some(product => product.id === recently.id);
        if (isDuplicate) {
          throw new Error('Bu ürün zaten mevcut.');
        }
        if (products.length >= 8) {
          return this.deleteRecentlyItem(products[0].id).pipe(
            map(() => recently)
          );
        }
        return [recently];
      }),
      switchMap((recentlyToSave) => {
        return this.http.post<RecentlyItem>(this.apiUrl, recentlyToSave, httpOptions);
      })
    );
  }
  deleteRecentlyItem(id: number): Observable<RecentlyItem>  {
    return this.http.delete<RecentlyItem>(this.apiUrl+'/'+id)
  }
}
