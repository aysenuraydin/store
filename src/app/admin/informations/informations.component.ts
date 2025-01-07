import { Component, ViewEncapsulation } from '@angular/core';
import { Banner } from '../../models/banner';
import { BannerService } from '../../services/banner.service';
import { InformationsService } from '../../services/informations.service';
import { About, Faqs, Info, SocialMedia } from '../../models/informations';
import { Message } from '../../models/message';

@Component({
  selector: 'informations',
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.css',
})
export class InformationsComponent {
  about: About = new About();
  info: Info = new Info();
  socialMedia: SocialMedia = new SocialMedia();
  faq: Faqs = new Faqs();

  constructor(private informationsService: InformationsService) { }

  ngOnInit(): void {
    this.about = this.getAbout();
    this.info = this.getInfo();
    this.socialMedia = this.getSocialMedia();
  }
  onMessageChange(message: string): void {
    this.about.message = message;
  }
  onAnswerChange(answer: string): void {
    this.faq.answer = answer;
  }
  onAdressChange(adress: string): void {
    this.info.adress = adress;
  }

  getFaqs(): Faqs[] {
    return this.informationsService.getFaqs().reverse();
  }
  saveFaq(category:Faqs):void{
    category.id
      ? this.informationsService.updateFaq(category)
      : this.informationsService.createFaq(category);
      this.cancel();
  }
  deleteFaq(id:number):void{
    this.informationsService.deleteFaq(id);
    this.cancel();
  }
  editFaq(id:number):void{
    // prompt(this.faq.answer)
    this.faq = this.informationsService.getFaq(id)?? new Faqs();
  }
  cancel():void{
    this.faq = new Faqs();
  }


  getAbout(): About{
    return this.informationsService.getAbout();
  }
  saveAbout(about:About):void{
    this.informationsService.updateAbout(about)
  }

  getInfo(): Info{
    return this.informationsService.getInfo();
  }
  saveInfo(about:Info):void{
    this.informationsService.updateInfo(about)
  }

  getSocialMedia(): SocialMedia{
    return this.informationsService.getSocialMedia();
  }
  saveSocialMedia(about:SocialMedia):void{
    this.informationsService.updateSocialMedia(about)
  }

}


