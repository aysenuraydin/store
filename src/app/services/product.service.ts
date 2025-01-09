
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl:string = 'api/product';

  constructor(private http: HttpClient ) {}

  getProducts() :Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(categories => categories)
    );
  }
  getProductsByCategoryId(id:number) :Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products =>
        id === 0
        ? products
        : products.filter(product => product.categoryId === id))
    );
  }
  getProduct(id:number) : Observable<Product>{
    return this.http.get<Product>(this.apiUrl+'/'+id);
  }
  createProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getProducts().pipe(
      map(products => {
        const lastId = products.length > 0 ? products.at(-1)?.id ?? 0 : 0;
        product.id = lastId + 1;
        return product;
      }),
      switchMap((c) => {
        return this.http.post<Product>(this.apiUrl, c, httpOptions);
      })
    );
  }
  updateProduct(product: Product): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, product, httpOptions)
  }
  deleteProduct(id: number): Observable<Product>  {
    return this.http.delete<Product>(this.apiUrl+'/'+id)
  }
}
