
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
import { Review } from '../models/review';
import { ReviewRepository } from '../repository/review.repository';
import { AdressItem } from '../models/adressItem';
import { FavItem } from '../models/favItem';
import { RecentlyItem } from '../models/recentlyItem';
import { FavItemRepository } from '../repository/favItem.repository';
import { RecentlyItemRepository } from '../repository/recentlyItem.repository';
import { CartItem } from '../models/cart';
import { CartItemRepository } from '../repository/cartItem.repository';
import { Order } from '../models/order';
import { OrderRepository } from '../repository/order.repository';
import { User } from '../models/user';
import { Role } from '../models/role';
import { UserRepository } from '../repository/user.repository';
import { RoleRepository } from '../repository/role.repository';
import { AdressRepository } from '../repository/adress.repository';
import { AlertRepository } from '../repository/alert.repository';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private products: Product[] = [];
  private sliders: Slider[] = [];
  private message: Message[] = [];
  private categories: Category[] = [];
  private banners: Banner[] = [];
  private subscribes: Subscribe[] = [];
  private reviews: Review[] = [];

  private faqs: Faqs[]=[];
  private about: About[]=[];
  private info: Info[]=[];
  private socialMedia: SocialMedia[]=[];

  private adresses: AdressItem[]=[];
  private favs: FavItem[]=[];
  private recentlies: RecentlyItem[]=[];
  private cartItems: CartItem[]=[];
  private orders: Order[]=[];

  private users: User[]=[];
  private roles: Role[]=[];

  private alerts: Alert[]=[];

  constructor() {
    new ProductRepository().getProducts().forEach(p => this.products.push(p));
    new SliderRepository().getSliders().forEach(p => this.sliders.push(p));
    new MessageRepository().getContacts().forEach(p => this.message.push(p));
    new CategoryRepository().getCategories().forEach(p => this.categories.push(p));
    new BannerRepository().getBanners().forEach(p => this.banners.push(p));
    new SubscribeRepository().getSubscribes().forEach(p => this.subscribes.push(p));
    new ReviewRepository().getReviews().forEach(p => this.reviews.push(p));
    new InformationsRepository().getFaqs().forEach(p => this.faqs.push(p));
    new InformationsRepository().getAbout().forEach(p => this.about.push(p));
    new InformationsRepository().getInfo().forEach(p => this.info.push(p));
    new InformationsRepository().getSocialMedia().forEach(p => this.socialMedia.push(p));

    new AdressRepository().getAdresses().forEach(p => this.adresses.push(p));
    new FavItemRepository().getFavs().forEach(p => this.favs.push(p));
    new RecentlyItemRepository().getRecentlies().forEach(p => this.recentlies.push(p));
    new CartItemRepository().getCartItems().forEach(p => this.cartItems.push(p));
    new OrderRepository().getOrders().forEach(p => this.orders.push(p));

    new UserRepository().getUsers().forEach(p => this.users.push(p));
    new RoleRepository().getRoles().forEach(p => this.roles.push(p));

    new AlertRepository().getAlerts().forEach(p => this.alerts.push(p));
  }

  createDb() {
    const product: Product[] = [
      ...this.products,
    ];
    const slider: Slider[] = [
      ...this.sliders,
    ];
    const message: Message[] = [
      ...this.message,
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
    const about: About[] = [
      ...this.about,
    ];
    const info: Info[] = [
      ...this.info,
    ];
    const socialMedia: SocialMedia[] = [
      ...this.socialMedia,
    ];
    const review: Review[] = [
      ...this.reviews,
    ];
    const adress: AdressItem[] = [
      ...this.adresses,
    ];
    const recently: RecentlyItem[] = [
      ...this.recentlies,
    ];
    const fav: FavItem[] = [
      ...this.favs,
    ];
    const cart: CartItem[] = [
      ...this.cartItems,
    ];
    const order: Order[] = [
      ...this.orders,
    ];
    const role: Role[] = [
      ...this.roles,
    ];
    const user: User[] = [
      ...this.users,
    ];
    const alert: Alert[] = [
      ...this.alerts,
    ];


    return {
      product,
      slider,
      message,
      category,
      banner,
      subscribe,
      faq,
      about,
      info,
      socialMedia,
      review,
      adress,
      recently,
      fav,
      cart,
      order,
      role,
      user,
      alert
    };
  }
}

