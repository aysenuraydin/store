import { Injectable } from '@angular/core';
import { Banner } from '../models/banner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, switchMap, tap } from 'rxjs';

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

  private loadBanners(): void {
    this.getActiveBanner().subscribe(
      (b) => {
        this.currentBannerSubject.next(b);
      },
      (error) => {
        console.error('Kategori yüklenirken hata oluştu:', error);
      }
    );
  }
  getEveryBanners() :Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(categories => categories)
    );
  }
  getActiveBanner(): Observable<Banner> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(banners => banners.find(banner => banner.isActive) ?? new Banner())
    );
  }
  getDisableBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(banners => banners.filter(banner => !banner.isActive))
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
      })
    );
  }
  getBanners(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Banner[]; totalPages: number }> {
    return this.getAllBanners().pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
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
        })
    );
  }
  getBanner(id:number) :Observable<Banner>{
    return this.http.get<Banner>(this.apiUrl+'/'+id);
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
          catchError((error) => {
            console.error('Kategori oluşturulurken hata oluştu:', error);
            throw error;
          })
        );
      })
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
                  catchError((error) => {
                    console.error('Kategori oluşturulurken hata oluştu:', error);
                    throw error;
                  })
                );
              })
            );
          } else {
            return this.http.put(this.apiUrl, banner, httpOptions).pipe(
              tap(() => this.loadBanners()),
              catchError((error) => {
                console.error('Kategori oluşturulurken hata oluştu:', error);
                throw error;
              })
            );
          }
        })
      );
    }
    return this.http.put(this.apiUrl, banner, httpOptions).pipe(
      tap(() => this.loadBanners()),
      catchError((error) => {
        console.error('Kategori oluşturulurken hata oluştu:', error);
        throw error;
      })
    );
  }
  deleteBanner(id: number): Observable<Banner>  {
    return this.http.delete<Banner>(this.apiUrl+'/'+id).pipe(
      tap(() => this.loadBanners()),
      catchError((error) => {
        console.error('Kategori oluşturulurken hata oluştu:', error);
        throw error;
      })
    );
  }
}

