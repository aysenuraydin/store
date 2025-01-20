import { Injectable } from '@angular/core';
import { Slider } from '../models/slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private apiUrl = 'api/slider';
  private currentSliderSubject: BehaviorSubject<Slider[]>;
  public currentSlider$: Observable<Slider[]>;

  constructor (private http: HttpClient) {
    this.currentSliderSubject = new BehaviorSubject<Slider[]>([]);
    this.currentSlider$ = this.currentSliderSubject.asObservable();

    this.loadSliders();
  }

  private loadSliders(): void {
    this.getActiveSliders().subscribe(
      (categories) => {
        this.currentSliderSubject.next(categories);
      },
      (error) => {
        console.error('Kategori yüklenirken hata oluştu:', error);
      }
    );
  }

  getEverySliders() :Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map(categories => categories)
    );
  }
  searchSliders(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Slider[]; totalPages: number }> {
    return this.getAllSliders().pipe(
        map(response => {
            const filteredProducts = response.filter(p => [p.name, p.imgUrl]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
            const totalPages = Math.ceil(filteredProducts.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
    );
  }
  getActiveSliders(): Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map(banners => banners.filter(banner => banner.isActive))
    );
  }
  getDisableSliders(): Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map(banners => banners.filter(banner => !banner.isActive))
    );
  }
    getAllSliders(): Observable<Slider[]> {
      return forkJoin({
        actived: this.getActiveSliders(),
        disabled: this.getDisableSliders(),
      }).pipe(
        map(({ actived, disabled }) => {
          const activeBanners = actived.reverse();
          const disableBanners = disabled.reverse();
          return [...activeBanners, ...disableBanners];
        })
      );
    }
  getSliders(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Slider[]; totalPages: number }> {
    return this.getAllSliders().pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
    );
  }
  getSlider(id:number) :Observable<Slider>{
  return this.http.get<Slider>(this.apiUrl+'/'+id);
  }
  createSubscribe(slider: Slider): Observable<Slider> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getEverySliders().pipe(
      map(sliders => {
        const lastId = sliders.length > 0 ? sliders.at(-1)?.id ?? 0 : 0;
        slider.id = lastId + 1;
        return slider;
      }),
      switchMap((updatedSubscribe) => {
        return this.http.post<Slider>(this.apiUrl, updatedSubscribe, httpOptions).pipe(
              tap(() => this.loadSliders()),
              catchError((error) => {
                console.error('Kategori oluşturulurken hata oluştu:', error);
                throw error;
              })
            );
      })
    );
  }
  updateSubscribe(slider: Slider): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, slider, httpOptions).pipe(
      tap(() => this.loadSliders()),
      catchError((error) => {
        console.error('Kategori oluşturulurken hata oluştu:', error);
        throw error;
      })
    );
  }
  deleteSubscribe(id: number): Observable<Slider>  {
    return this.http.delete<Slider>(this.apiUrl+'/'+id).pipe(
      tap(() => this.loadSliders()),
      catchError((error) => {
        console.error('Kategori oluşturulurken hata oluştu:', error);
        throw error;
      })
    );
  }
}
