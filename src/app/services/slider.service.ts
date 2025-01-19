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

  getSliders() :Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map(categories => categories)
    );
  }
  searchSliders(query: string) :Observable<Slider[]> {
    return this.http.get<Slider[]>(this.apiUrl).pipe(
      map( role =>role.filter(p => [p.name, p.imgUrl]
        .some(field => field?.toLowerCase().includes(query.toLowerCase()))
      ) )
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
  getSlider(id:number) :Observable<Slider>{
  return this.http.get<Slider>(this.apiUrl+'/'+id);
  }
  createSubscribe(slider: Slider): Observable<Slider> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getSliders().pipe(
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
