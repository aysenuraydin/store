
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CategoryService } from './category.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, pipe } from 'rxjs';
import { Category } from '../models/category';
import { CategoryProductService } from './category-product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl:string = 'api/product';

  constructor(   private http: HttpClient ) {}

  getProducts() :Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(categories => categories)
    );
  }
  getProductsByCategoryId(id:number) :Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.filter(product => product.categoryId === id))
    );
  }
  getProduct(id:number) : Observable<Product>{
    return this.http.get<Product>(this.apiUrl+'/'+id);
  }
  createProduct(subscribe: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getProducts().pipe(
      map(subscribes => {
        const lastId = subscribes.length > 0 ? subscribes.at(-1)?.id ?? 0 : 0;
        subscribe.id = lastId + 1;
        return subscribe;
      }),
      switchMap((c) => {
        return this.http.post<Product>(this.apiUrl, c, httpOptions);
      })
    );
  }
  updateProduct(subscribe: Product): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, subscribe, httpOptions)
  }
  deleteProduct(id: number): Observable<Product>  {
    return this.http.delete<Product>(this.apiUrl+'/'+id)
  }
}
