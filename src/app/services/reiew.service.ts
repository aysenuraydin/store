import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'api/review';

  constructor(private http: HttpClient) {  }

  getReviews() :Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      map(reviews => reviews)
    );
  }
  getReviewsByProdurtId(id:number): Observable<Review[]> {
    //todo productname ve username i ekle any tipinde dön
    return this.http.get<Review[]>(this.apiUrl).pipe(
      map(reviews =>
        reviews.filter(review => review.isConfirmed && review.productId==id)
      )
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

