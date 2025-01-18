import { Injectable } from '@angular/core';
import { Slider } from '../models/slider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private apiUrl = 'api/slider';

  constructor (private http: HttpClient) { }

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
        return this.http.post<Slider>(this.apiUrl, updatedSubscribe, httpOptions);
      })
    );
  }
  updateSubscribe(slider: Slider): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, slider, httpOptions)
  }
  deleteSubscribe(id: number): Observable<Slider>  {
    return this.http.delete<Slider>(this.apiUrl+'/'+id)
  }
}
