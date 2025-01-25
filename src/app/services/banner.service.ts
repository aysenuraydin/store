import { Injectable } from '@angular/core';
import { Banner } from '../models/banner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'api/banner';

  private currentBannerSubject: BehaviorSubject<Banner | null>;
  public currentBanner$: Observable<Banner | null>;

  constructor(private http: HttpClient) {
    this.currentBannerSubject = new BehaviorSubject<Banner | null>(null);
    this.currentBanner$ = this.currentBannerSubject.asObservable();
    this.loadBanners();
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  private loadBanners(): void {
    this.getActiveBanner().subscribe({
      next: (b) => this.currentBannerSubject.next(b),
      error: (error) => console.error('Banners yüklenirken hata oluştu:', error),
    });
  }
  getEveryBanners() :Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(categories => categories),
      catchError(this.handleError)
    );
  }
  getActiveBanner(): Observable<Banner> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(banners => banners.find(banner => banner.isActive) ?? new Banner()),
      catchError(this.handleError)
    );
  }
  getDisableBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(banners => banners.filter(banner => !banner.isActive)),
      catchError(this.handleError)
    );
  }
  getAllBanners(): Observable<Banner[]> {
    return forkJoin({
      active: this.getActiveBanner(),
      disabled: this.getDisableBanners(),
    }).pipe(
      map(({ active, disabled }) => {
        const disableBanners = disabled.reverse();
        return [active, ...disableBanners];
      }),
      catchError(this.handleError)
    );
  }
  getBanners(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Banner[]; totalPages: number }> {
    return this.getAllBanners().pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        }),
      catchError(this.handleError)
    );
  }

  searchBanners(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Banner[]; totalPages: number }> {
    return this.getAllBanners().pipe(
        map(response => {
            const filteredProducts = response.filter(r =>
              [r.message, r.button]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? filteredProducts.slice(startIndex, startIndex + pageSize) : filteredProducts;
            const totalPages = Math.ceil(filteredProducts.length / pageSize);

            return { products: paginatedProducts, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getBanner(id:number) :Observable<Banner>{
    return this.http.get<Banner>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
  createBanner(banner: Banner): Observable<Banner> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getEveryBanners().pipe(
      map(subscribes => {
        const lastId = subscribes.length > 0 ? subscribes.at(-1)?.id ?? 0 : 0;
        banner.id = lastId + 1;
        return banner;
      }),
      switchMap((updatedSubscribe) => {
        return this.http.post<Banner>(this.apiUrl, updatedSubscribe, httpOptions).pipe(
          tap(() => this.loadBanners()),
          catchError(this.handleError)
        );
      }),
      catchError(this.handleError)
    );
  }
  updateBanner(banner: Banner): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    if (banner.isActive) {
      return this.getActiveBanner().pipe(
        switchMap(activeBanner => {
          if (activeBanner && activeBanner.id !== banner.id) {
            activeBanner.isActive = false;
            return this.http.put(this.apiUrl, activeBanner, httpOptions).pipe(
              switchMap(() => {
                return this.http.put(this.apiUrl, banner, httpOptions).pipe(
                  tap(() => this.loadBanners()),
                  catchError(this.handleError)
                );
              })
            );
          } else {
            return this.http.put(this.apiUrl, banner, httpOptions).pipe(
              tap(() => this.loadBanners()),
              catchError(this.handleError)
            );
          }
        })
      );
    }
    return this.http.put(this.apiUrl, banner, httpOptions).pipe(
      tap(() => this.loadBanners()),
      catchError(this.handleError)
    );
  }
  deleteBanner(id: number): Observable<Banner> {
    return this.getAllBanners().pipe(
      map((data) => {
        const active = data.find((i) => i.isActive);
        if (active && id === active.id) {
          catchError(this.handleError)
        }
        return id;
      }),
      switchMap((bannerId) =>
        this.http.delete<Banner>(`${this.apiUrl}/${bannerId}`).pipe(
          tap(() => this.loadBanners()),
          catchError(this.handleError)
        )
      ),
      catchError(this.handleError)
    );
  }
}

