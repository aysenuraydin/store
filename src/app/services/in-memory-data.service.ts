
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Banner } from '../models/banner';
import { SliderRepository } from '../repository/slider.repository';
import { Slider } from '../models/slider';
import { ProductRepository } from '../repository/product.repository';
import { ContactRepository } from '../repository/contact.repository';
import { Contact } from '../models/contact';
import { Category } from '../models/category';
import { CategoryRepository } from '../repository/category.repository';
import { BannerRepository } from '../repository/banner.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private products: Product[] = [];
  private sliders: Slider[] = [];
  private contacts: Contact[] = [];
  private categories: Category[] = [];
  private banners: Banner[] = [];

  constructor() {
    new ProductRepository().getProducts().forEach(p => this.products.push(p));
    new SliderRepository().getSliders().forEach(p => this.sliders.push(p));
    new ContactRepository().getContacts().forEach(p => this.contacts.push(p));
    new CategoryRepository().getCategories().forEach(p => this.categories.push(p));
    new BannerRepository().getBanners().forEach(p => this.banners.push(p));
  }

  createDb() {
    const products: Product[] = [
      ...this.products,
    ];
    const sliders: Slider[] = [
      ...this.sliders,
    ];
    const contacts: Contact[] = [
      ...this.contacts,
    ];
    const categories: Category[] = [
      ...this.categories,
    ];
    const banners: Banner[] = [
      ...this.banners,
    ];

    return { products, sliders, contacts, categories, banners };
  }
}

