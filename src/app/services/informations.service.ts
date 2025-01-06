import { Injectable } from '@angular/core';
import { About, Contact, Faqs, Info, SocialMedia } from '../models/informations';
import { InformationsRepository } from '../repository/informations.repository';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

    private dataSource: InformationsRepository;
      private about: About;
      private info: Info;
      private socialMedia: SocialMedia;
      private faqs: Faqs[];

    constructor() {
      this.dataSource = new InformationsRepository();
      this.faqs = new Array<Faqs>();

      this.dataSource.getFaqs().forEach(p => this.faqs.push(p));

      this.about = this.dataSource.getAbout()
      this.info = this.dataSource.getInfo()
      this.socialMedia = this.dataSource.getSocialMedia()
    }
    getAbout() :About {
      return this.about;
    }
    updateAbout(about: About): void {
      this.about = about;
    }


    getInfo() :Info {
      return this.info;
    }
    updateInfo(info: Info): void {
      this.info = info;
    }

    getSocialMedia() :SocialMedia {
      return this.socialMedia;
    }
    updateSocialMedia(socialMedia: SocialMedia): void {
      this.socialMedia = socialMedia;
    }

    getFaqs() :Faqs[] {
      return this.faqs;
    }
    getFaq(id:number) :Faqs | undefined {
      return this.faqs.find(i=>i.id==id);
    }
    createFaq(faqs: Faqs): void{
      faqs.id=(this.faqs.at(-1)?.id?? 0) + 1;
      this.faqs.push(faqs);
    }
    updateFaq(faqs: Faqs): void {
      const index = this.faqs.findIndex(p => p.id === faqs.id);
      if (index !== -1) {
        this.faqs[index] = faqs;
      }
    }
    deleteFaq(id: number): void {
      const index = this.faqs.findIndex(p => p.id === id);
      if (index !== -1) {
        this.faqs.splice(index, 1);
      }
    }

}
