
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Banner } from '../models/banner';
import { SliderRepository } from '../repository/slider.repository';
import { Slider } from '../models/slider';
import { ProductRepository } from '../repository/product.repository';
import { MessageRepository } from '../repository/message.repository';
import { Message } from '../models/message';
import { Category } from '../models/category';
import { CategoryRepository } from '../repository/category.repository';
import { BannerRepository } from '../repository/banner.repository';
import { Subscribe } from '../models/Subscribe';
import { SubscribeRepository } from '../repository/subscribe.repository';
import { About, Faqs, Info, SocialMedia } from '../models/informations';
import { InformationsRepository } from '../repository/informations.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private products: Product[] = [];
  private sliders: Slider[] = [];
  private contacts: Message[] = [];
  private categories: Category[] = [];
  private banners: Banner[] = [];
  private subscribes: Subscribe[] = [];
  private faqs: Faqs[]=[];
  private about: About = new About();
  private info: Info= new Info();
  private socialMedia: SocialMedia= new SocialMedia();

  constructor() {
    new ProductRepository().getProducts().forEach(p => this.products.push(p));
    new SliderRepository().getSliders().forEach(p => this.sliders.push(p));
    new MessageRepository().getContacts().forEach(p => this.contacts.push(p));
    new CategoryRepository().getCategories().forEach(p => this.categories.push(p));
    new BannerRepository().getBanners().forEach(p => this.banners.push(p));
    new SubscribeRepository().getSubscribes().forEach(p => this.subscribes.push(p));

    new InformationsRepository().getFaqs().forEach(p => this.faqs.push(p));
    this.about = new InformationsRepository().getAbout();
    this.info = new InformationsRepository().getInfo();
    this.socialMedia = new InformationsRepository().getSocialMedia();
  }

  createDb() {
    const product: Product[] = [
      ...this.products,
    ];
    const slider: Slider[] = [
      ...this.sliders,
    ];
    const contact: Message[] = [
      ...this.contacts,
    ];
    const category: Category[] = [
      ...this.categories,
    ];
    const banner: Banner[] = [
      ...this.banners,
    ];
    const subscribe: Subscribe[] = [
      ...this.subscribes,
    ];
    const faq: Faqs[] = [
      ...this.faqs,
    ];
    const about: About = this.about;

    const info: Info = this.info;

    const socialMedia: SocialMedia = this.socialMedia;

    return { product, slider, contact, category, banner, subscribe, faq, about, info, socialMedia};
  }
}

