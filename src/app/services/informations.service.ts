import { Injectable } from '@angular/core';
import { About, Contact, Faqs, Info, SocialMedia } from '../models/informations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {
    private aboutApiUrl= 'api/about'
    private infoApiUrl= 'api/info'
    private socialMediaApiUrl= 'api/socialMedia'
    private faqsApiUrl= 'api/faq'

    constructor(private http: HttpClient) { }

    private handleError(error: any): Observable<never> {
      console.error('An error occurred:', error);
      const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
      return throwError(() => new Error(errorMessage));
    }
    getAbout() : Observable<About>{
      return this.http.get<About>(this.aboutApiUrl+'/'+1).pipe(
         catchError(this.handleError)
      )
    }
    updateAbout(about: About): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.aboutApiUrl, about, httpOptions).pipe(
        catchError(this.handleError)
      )
    }

    getInfo() : Observable<Info>{
      return this.http.get<Info>(this.infoApiUrl+'/'+1).pipe(
        catchError(this.handleError)
      )
    }
    updateInfo(info: Info): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.infoApiUrl, info, httpOptions).pipe(
        catchError(this.handleError)
      )
    }

    getSocialMedia() :Observable<SocialMedia>{
      return this.http.get<SocialMedia>(this.socialMediaApiUrl+'/'+1);
    }
    updateSocialMedia(social: SocialMedia): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.socialMediaApiUrl, social, httpOptions).pipe(
        catchError(this.handleError)
      )
    }

    getFaqs() :Observable<Faqs[]> {
      return this.http.get<Faqs[]>(this.faqsApiUrl).pipe(
        map(categories => categories),
        catchError(this.handleError)
      );
    }
    getFaq(id:number) :Observable<Faqs>{
      return this.http.get<Faqs>(this.faqsApiUrl+'/'+id).pipe(
        catchError(this.handleError)
      )
    }
    createSubscribe(faq: Faqs): Observable<Faqs> {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.getFaqs().pipe(
        map(subscribes => {
          const lastId = subscribes.length > 0 ? subscribes.at(-1)?.id ?? 0 : 0;
          faq.id = lastId + 1;
          return faq;
        }),
        switchMap((updatedSubscribe) => {
          return this.http.post<Faqs>(this.faqsApiUrl, updatedSubscribe, httpOptions);
        }),
        catchError(this.handleError)
      );
    }
    updateFaq(faq: Faqs): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.faqsApiUrl, faq, httpOptions).pipe(
        catchError(this.handleError)
      )
    }
    deleteFaq(id: number): Observable<Faqs>  {
      return this.http.delete<Faqs>(this.faqsApiUrl+'/'+id).pipe(
        catchError(this.handleError)
      )
    }

}
