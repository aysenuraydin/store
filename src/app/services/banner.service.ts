import { Injectable } from '@angular/core';
import { Banner } from '../models/banner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'api/banner';

  constructor(private http: HttpClient) {  }

  getBanners() :Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(categories => categories)
    );
  }
  getDisableBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(banners => banners.filter(banner => !banner.isActive))
    );
  }
  searchBanners(query: string) :Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map( role =>role.filter(
        (r) => [r.message, r.button]
        .some(field => field.toLowerCase().includes(query.toLowerCase()))
        )
      )
    );
  }
  getBanner(id:number) :Observable<Banner>{
    return this.http.get<Banner>(this.apiUrl+'/'+id);
  }
  getActiveBanner(): Observable<Banner> {
    return this.http.get<Banner[]>(this.apiUrl).pipe(
      map(banners => banners.find(banner => banner.isActive) ?? new Banner())
    );
  }
  createBanner(banner: Banner): Observable<Banner> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getBanners().pipe(
      map(subscribes => {
        const lastId = subscribes.length > 0 ? subscribes.at(-1)?.id ?? 0 : 0;
        banner.id = lastId + 1;
        return banner;
      }),
      switchMap((updatedSubscribe) => {
        return this.http.post<Banner>(this.apiUrl, updatedSubscribe, httpOptions);
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
                return this.http.put(this.apiUrl, banner, httpOptions);
              })
            );
          } else {
            return this.http.put(this.apiUrl, banner, httpOptions);
          }
        })
      );
    }
    return this.http.put(this.apiUrl, banner, httpOptions);
  }
  deleteBanner(id: number): Observable<Banner>  {
    return this.http.delete<Banner>(this.apiUrl+'/'+id)
  }
}

