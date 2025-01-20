import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, count, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Review } from '../models/review';
import { UserService } from './user.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'api/review';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private productService: ProductService
  ) {  }

  getReviews() :Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      map(reviews => reviews)
    );
  }
  getAllReviewsWithUserAndProduct(): Observable<(Review & { username: string; productName: string; productUrl: string })[]> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      switchMap(reviews => {
        const reviewsWithUserAndProduct$ = reviews.map(review =>
          forkJoin({
            user: this.userService.getUser(review.userId),
            product: this.productService.getProduct(review.productId)
          }).pipe(
            map(({ user, product }) => ({
              ...review,
              username: user ? `${user.name} ${user.surname}` : 'Unknown User',
              productName: product ? product.name : 'Unknown Product',
              productUrl: product ? product.imgUrl : 'Unknown URL'
            })),
            catchError(err => {
              console.error('Error fetching user or product:', err);
              return of({
                ...review, username: 'Error', productName: 'Error', productUrl: 'Error'
              });
            })
          )
        );
        return forkJoin(reviewsWithUserAndProduct$); // Tüm yorumları birleştir
      })
    );
  }
  getReviewsWithUserAndProduct(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Review[]; totalPages: number }> {
    return this.getAllReviewsWithUserAndProduct().pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
    );
  }
  getReviewWithUserAndProduct(id: number): Observable<Review & { username: string; productName: string; productUrl: string }> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`).pipe(
      switchMap(review =>
        forkJoin({
          user: this.userService.getUser(review.userId),
          product: this.productService.getProduct(review.productId)
        }).pipe(
          map(({ user, product }) => ({
            ...review,
            username: user ? `${user.name} ${user.surname}` : 'Unknown User',
            productName: product ? product.name : 'Unknown Product',
            productUrl: product ? product.imgUrl : 'Unknown URL'
          })),
          catchError(err => {
            console.error('Error fetching user or product:', err);
            return of({
              ...review,
              username: 'Error',
              productName: 'Error',
              productUrl: 'Error'
            });
          })
        )
      )
    );
  }


  searchReviews(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Review[]; totalPages: number }> {
    return this.getAllReviewsWithUserAndProduct().pipe(
        map(response => {
            const filteredProducts = response.filter(p => [p.username, p.productName, p.text]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
            const totalPages = Math.ceil(filteredProducts.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
    );
  }


  getReviewsByProdurtId(id:number): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      map(reviews =>
        reviews.filter(review => review.isConfirmed && review.productId==id)
      )
    );
  }

  getAverageAndCountByProductId(id: number): Observable<{average:number,count:number}> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      map((reviews) => {
        const productReviews = reviews.filter(i => i.productId == id);
        const count = productReviews.length;
        const total = productReviews.reduce((sum, item) => sum + item.starCount, 0);
        const average = count > 0 ? total / count : 0;
        return {average, count};
      })
    );
  }

  getReview(id:number) :Observable<Review>{
    return this.http.get<Review>(this.apiUrl+'/'+id);
  }
  getActiveReview(productId:number): Observable<Review> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      map(review => review.find(r => r.isConfirmed) ?? new Review())
    );
  }
  createReview(review: Review): Observable<Review> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getReviews().pipe(
      map(reviews => {
        const lastId = reviews.length > 0 ? reviews.at(-1)?.id ?? 0 : 0;
        review.id = lastId + 1;
        return review;
      }),
      switchMap((updatedReview) => {
        return this.http.post<Review>(this.apiUrl, updatedReview, httpOptions);
      })
    );
  }
  updateReview(review: Review): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, review, httpOptions)
  }
  deleteReview(id: number): Observable<Review>  {
    return this.http.delete<Review>(this.apiUrl+'/'+id)
  }
}

