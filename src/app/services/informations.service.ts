import { Injectable } from '@angular/core';
import { About, Contact, Faqs, Info, SocialMedia } from '../models/informations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {
    private aboutApiUrl= 'api/about'
    private infoApiUrl= 'api/info'
    private socialMediaApiUrl= 'api/socialMedia'
    private faqsApiUrl= 'api/faq'

    constructor(private http: HttpClient) { }

    getAbout() : Observable<About>{
      return this.http.get<About>(this.aboutApiUrl+'/'+1);
    }
    updateAbout(about: About): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.aboutApiUrl, about, httpOptions)
    }

    getInfo() : Observable<Info>{
      return this.http.get<Info>(this.infoApiUrl+'/'+1);
    }
    updateInfo(info: Info): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.infoApiUrl, info, httpOptions)
    }

    getSocialMedia() :Observable<SocialMedia>{
      return this.http.get<SocialMedia>(this.socialMediaApiUrl+'/'+1);
    }
    updateSocialMedia(social: SocialMedia): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.socialMediaApiUrl, social, httpOptions)
    }

    getFaqs() :Observable<Faqs[]> {
      return this.http.get<Faqs[]>(this.faqsApiUrl).pipe(
        map(categories => categories)
      );
    }
    getFaq(id:number) :Observable<Faqs>{
      return this.http.get<Faqs>(this.faqsApiUrl+'/'+id);
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
        })
      );
    }
    updateFaq(faq: Faqs): Observable<any>  {
      const httpOptions= {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.faqsApiUrl, faq, httpOptions)
    }
    deleteFaq(id: number): Observable<Faqs>  {
      return this.http.delete<Faqs>(this.faqsApiUrl+'/'+id)
    }

}
