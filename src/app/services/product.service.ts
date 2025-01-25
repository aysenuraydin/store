
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, pipe, throwError, catchError } from 'rxjs';
import { ProductList } from '../models/productList';
import { FavService } from './fav.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl:string = 'api/product';

  constructor(private http: HttpClient, private favService: FavService ) {}

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  getProductItemsByViewCount(): Observable<ProductList[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) =>
        products
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 10)
      ),
      switchMap((topProducts: Product[]) => {
        const productsWithFavStatus$ = topProducts.map((product) =>
          this.favService.isOrNot(product.id).pipe(
            map((isFav) => ({
              ...product,
              isFav: isFav
            }))
          )
        );
        return forkJoin(productsWithFavStatus$);
      }),
      catchError(this.handleError)
    );
  }
  getAllProductItemsByCategoryId(id:number): Observable<ProductList[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) =>
          id == 0
          ? products
          : products.filter(product => product.categoryId == id)
      ),
      switchMap((topProducts: Product[]) => {
        const productsWithFavStatus$ = topProducts.map((product) =>
          this.favService.isOrNot(product.id).pipe(
            map((isFav) => ({
              ...product,
              isFav: isFav
            }))
          )
        );
        return forkJoin(productsWithFavStatus$);
      }),
      catchError(this.handleError)
    );
  }
  searchProducts(
    query: string,
    categoryId: number,
    pageNumber: number = 1,
    pageSize: number = 3
  ): Observable<{ products: Product[]; totalPages: number }> {
    return this.getProductsByCategoryId(categoryId).pipe(
      map(response => {
        const filteredProducts = response.filter(product =>
          [product.name, product.description, product.details]
            .some(field => field?.toLowerCase().includes(query.toLowerCase()))
        );

        const categoryFilteredProducts = categoryId > 0
          ? filteredProducts.filter(product => product.categoryId === categoryId)
          : filteredProducts;

        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedProducts = pageSize > 0
          ? categoryFilteredProducts.reverse().slice(startIndex, startIndex + pageSize)
          : categoryFilteredProducts;

        const totalPages = Math.ceil(categoryFilteredProducts.length / pageSize);

        return { products: paginatedProducts, totalPages };
      }),
      catchError(this.handleError)
    );
  }

  getProductItemsByCategoryId(id:number, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: ProductList[]; totalPages: number }> {
    return this.getAllProductItemsByCategoryId(id).pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getProductItems(): Observable<ProductList[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) =>
        products
      ),
      switchMap((topProducts: Product[]) => {
        const productsWithFavStatus$ = topProducts.map((product) =>
          this.favService.isOrNot(product.id).pipe(
            map((isFav) => ({
              ...product,
              isFav: isFav
            }))
          )
        );
        return forkJoin(productsWithFavStatus$.reverse().slice(0,12));
      })
    );
  }
  getProductsByCategoryId(id:number) :Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products =>
        id == 0
        ? products
        : products.filter(product => product.categoryId == id)),
        catchError(this.handleError)
    );
  }
  getProductsByCount(neededCount:number) :Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(product =>
        product.sort((a, b) => b.viewCount - a.viewCount).slice(0,(neededCount)).reverse()
      ),
      catchError(this.handleError)
    );
  }
  getProducts() :Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map( product =>product ),
      catchError(this.handleError)
    );
  }
  getProduct(id:number) : Observable<Product>{
    return this.http.get<Product>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
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
      }),
      catchError(this.handleError)
    );
  }
  updateProduct(product: Product): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, product, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  updateProductWithProductList(product: ProductList): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, product, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  deleteProduct(id: number): Observable<Product>  {
    return this.http.delete<Product>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
}
