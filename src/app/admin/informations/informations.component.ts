import { Component, ViewEncapsulation } from '@angular/core';
import { InformationsService } from '../../services/informations.service';
import { About, Faqs, Info, SocialMedia } from '../../models/informations';

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
  faqs: Faqs[] = [];
  buttonVisible:number = 1;

  constructor(private informationsService: InformationsService) { }

  ngOnInit(): void {
    this.getAbout();
    this.getInfo();
    this.getSocialMedia();
    this.getFaqs();
  }

  toggleWindow(value:number) :void {
    this.buttonVisible = value;
  }

  getAbout(): void {
    this.informationsService.getAbout()
    .subscribe(
      (data) => {
        this.about = data;
      }
    );
  }
  saveAbout(category:About):void{
    this.informationsService.updateAbout(category).subscribe(() => {
    this.getAbout();
    });
  }
  onMessageChange(message: string): void {
    this.about.message = message;
  }

  getInfo(): void {
    this.informationsService.getInfo()
    .subscribe(
      (data) => {
        this.info = data;
      }
    );
  }
  saveInfo(category:Info):void{
    this.informationsService.updateInfo(category).subscribe(() => {
    this.getInfo();
    });
  }

  getSocialMedia(): void {
    this.informationsService.getSocialMedia()
    .subscribe(
      (data) => {
        this.socialMedia = data;
      }
    );
  }
  saveSocialMedia(category:SocialMedia):void{
    this.informationsService.updateSocialMedia(category).subscribe(() => {
    this.getSocialMedia();
    });
  }

  getFaqs():  void {
    this.informationsService.getFaqs()
      .subscribe(
        (data) => {
          this.faqs = data.reverse();
      }
    );
  }
  editFaq(id:number): void {
    this.informationsService.getFaq(id)
    .subscribe(
      (data) => {
        this.faq = data;
      }
    );
  }
  saveFaq(category:Faqs):void{
    category.id
      ? this.updateFaq(category)
      : this.createFaq(category);

      this.cancel();
  }
  createFaq(category: Faqs): void {
    this.informationsService.createSubscribe(category).subscribe(() => {
      this.getFaqs();
    });
  }
  updateFaq(category:Faqs):void{
    this.informationsService.updateFaq(category).subscribe(() => {
      this.getFaqs();
    });
  }
  deleteFaq(id: number): void {
    this.informationsService.deleteFaq(id).subscribe();
    this.getFaqs();
    this.cancel();
  }

  cancel():void{
    this.faq = new Faqs();
  }
}


