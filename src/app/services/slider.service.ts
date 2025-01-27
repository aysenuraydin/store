import { Injectable } from '@angular/core';
import { Slider } from '../models/slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, switchMap, tap, throwError } from 'rxjs';

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
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  private loadSliders(): void {
    this.getActiveSliders().subscribe(
    {
      next: (b) => this.currentSliderSubject.next(b),
      error: (error) => console.error('Sliders yüklenirken hata oluştu:', error),
    })
  }

  getEverySliders() :Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map(categories => categories),
      catchError(this.handleError)
    );
  }
  searchSliders(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ sliders: Slider[]; totalPages: number }> {
    return this.getAllSliders().pipe(
        map(response => {
            const filteredSliders = response.filter(p => [p.name, p.imgUrl]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedSliders = pageSize > 0 ? filteredSliders.reverse().slice(startIndex, startIndex + pageSize) : filteredSliders;
            const totalPages = Math.ceil(filteredSliders.length / pageSize);

            return { sliders: paginatedSliders, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getActiveSliders(): Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map(banners => banners.filter(banner => banner.isActive)),
      catchError(this.handleError)
    );
  }
  getDisableSliders(): Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map(banners => banners.filter(banner => !banner.isActive)),
      catchError(this.handleError)
    );
  }
    getAllSliders(): Observable<Slider[]> {
      return forkJoin({
        actived: this.getActiveSliders(),
        disabled: this.getDisableSliders(),
      }).pipe(
        map(({ actived, disabled }) => {
          const activesliders = actived.reverse();
          const disablesliders = disabled.reverse();
          return [...activesliders, ...disablesliders];
        }),
        catchError(this.handleError)
      );
    }
  getSliders(pageNumber: number = 1, pageSize: number = 3): Observable<{ sliders: Slider[]; totalPages: number }> {
    return this.getAllSliders().pipe(
        map(sliders => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedSliders = pageSize > 0 ? sliders.slice(startIndex, startIndex + pageSize) : sliders;
            const totalPages = Math.ceil(sliders.length / pageSize);

            return { sliders: paginatedSliders, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getSlider(id:number) :Observable<Slider>{
  return this.http.get<Slider>(this.apiUrl+'/'+id).pipe(
    catchError(this.handleError)
  )
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
      }),
      catchError(this.handleError)
    );
  }
  updateSubscribe(slider: Slider): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, slider, httpOptions).pipe(
      tap(() => this.loadSliders()),
      catchError(this.handleError)
    );
  }
  deleteSubscribe(id: number): Observable<Slider>  {
    return this.http.delete<Slider>(this.apiUrl+'/'+id).pipe(
      tap(() => this.loadSliders()),
      catchError(this.handleError)
    );
  }
}
