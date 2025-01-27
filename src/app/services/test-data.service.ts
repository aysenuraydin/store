import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdressRepository } from '../repository/adress.repository';
import { AlertRepository } from '../repository/alert.repository';
import { BannerRepository } from '../repository/banner.repository';
import { CartItemRepository } from '../repository/cartItem.repository';
import { CategoryRepository } from '../repository/category.repository';
import { FavItemRepository } from '../repository/favItem.repository';
import { InformationsRepository } from '../repository/informations.repository';
import { MessageRepository } from '../repository/message.repository';
import { OrderRepository } from '../repository/order.repository';
import { ProductRepository } from '../repository/product.repository';
import { RecentlyItemRepository } from '../repository/recentlyItem.repository';
import { ReviewRepository } from '../repository/review.repository';
import { RoleRepository } from '../repository/role.repository';
import { SliderRepository } from '../repository/slider.repository';
import { SubscribeRepository } from '../repository/subscribe.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable({
  providedIn: 'root'
})
export class TestDataService {
  private firebaseUrl = 'https://ng-store-app-4b8c3-default-rtdb.firebaseio.com/';

  private adressRepository: AdressRepository;
  private alertRepository: AlertRepository;
  private bannerRepository: BannerRepository;
  private cartItemRepository: CartItemRepository;
  private categoryRepository: CategoryRepository;
  private favItemRepository: FavItemRepository;
  private informationsRepository: InformationsRepository;
  private messageRepository: MessageRepository;
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;
  private recentlyItemRepository: RecentlyItemRepository;
  private reviewRepository: ReviewRepository;
  private roleRepository: RoleRepository;
  private sliderRepository: SliderRepository;
  private subscribeRepository: SubscribeRepository;
  private userRepository: UserRepository;

  constructor(private http: HttpClient) {
    this.adressRepository = new AdressRepository();
    this.alertRepository = new AlertRepository();
    this.bannerRepository = new BannerRepository();
    this.cartItemRepository = new CartItemRepository();
    this.categoryRepository = new CategoryRepository();
    this.favItemRepository = new FavItemRepository();
    this.informationsRepository = new InformationsRepository();
    this.messageRepository = new MessageRepository();
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
    this.recentlyItemRepository = new RecentlyItemRepository();
    this.reviewRepository = new ReviewRepository();
    this.roleRepository = new RoleRepository();
    this.sliderRepository = new SliderRepository();
    this.subscribeRepository = new SubscribeRepository();
    this.userRepository = new UserRepository();
  }

  private uploadDataToFirebase(repositoryData: any[], collectionName: string): void {
    this.http.get(`${this.firebaseUrl}${collectionName}.json`).subscribe({
      next: (existingData) => {
        if (!existingData || Object.keys(existingData).length === 0) {
          repositoryData.forEach((item) => {
            this.http.post(`${this.firebaseUrl}${collectionName}.json`, item).subscribe({
              next: (response) => {
                console.log(`${collectionName} uploaded successfully:`, response);
              },
              error: (error) => {
                console.error(`Error uploading ${collectionName}:`, error);
              }
            });
          });
        }
      },
      error: (error) => {
        console.error(`Error checking Firebase data for ${collectionName}:`, error);
      }
    });
  }

  uploadBannersToFirebase(): void {
    const banners = this.bannerRepository.getBanners();
    this.uploadDataToFirebase(banners, 'banner');
  }

  uploadAddressesToFirebase(): void {
    const addresses = this.adressRepository.getAdresses();
    this.uploadDataToFirebase(addresses, 'addres');
  }

  uploadAlertsToFirebase(): void {
    const alerts = this.alertRepository.getAlerts();
    this.uploadDataToFirebase(alerts, 'alert');
  }

  uploadCartItemsToFirebase(): void {
    const cartItems = this.cartItemRepository.getCartItems();
    this.uploadDataToFirebase(cartItems, 'cart');
  }

  uploadCategoriesToFirebase(): void {
    const categories = this.categoryRepository.getCategories();
    this.uploadDataToFirebase(categories, 'category');
  }
  uploadFavItemsToFirebase(): void {
    const favItems = this.favItemRepository.getFavs();
    this.uploadDataToFirebase(favItems, 'fav');
  }

  uploadFaqToFirebase(): void {
    const informations = this.informationsRepository.getAbout();
    this.uploadDataToFirebase(informations, 'faq');
  }
  uploadAboutToFirebase(): void {
    const informations = this.informationsRepository.getAbout();
    this.uploadDataToFirebase(informations, 'about');
  }
  uploadİnfoToFirebase(): void {
    const informations = this.informationsRepository.getAbout();
    this.uploadDataToFirebase(informations, 'info');
  }
  uploadSocialMediaToFirebase(): void {
    const informations = this.informationsRepository.getAbout();
    this.uploadDataToFirebase(informations, 'socialMedia');
  }

  uploadMessagesToFirebase(): void {
    const messages = this.messageRepository.getContacts();
    this.uploadDataToFirebase(messages, 'message');
  }
  uploadOrdersToFirebase(): void {
    const orders = this.orderRepository.getOrders();
    this.uploadDataToFirebase(orders, 'order');
  }
  uploadProductsToFirebase(): void {
    const products = this.productRepository.getProducts();
    this.uploadDataToFirebase(products, 'product');
  }
  uploadRecentlyItemsToFirebase(): void {
    const recentlyItems = this.recentlyItemRepository.getRecentlies();
    this.uploadDataToFirebase(recentlyItems, 'recently');
  }
  uploadReviewsToFirebase(): void {
    const reviews = this.reviewRepository.getReviews();
    this.uploadDataToFirebase(reviews, 'review');
  }
  uploadRolesToFirebase(): void {
    const roles = this.roleRepository.getRoles();
    this.uploadDataToFirebase(roles, 'role');
  }
  uploadSlidersToFirebase(): void {
    const sliders = this.sliderRepository.getSliders();
    this.uploadDataToFirebase(sliders, 'slider');
  }
  uploadSubscribeToFirebase(): void {
    const subscriptions = this.subscribeRepository.getSubscribes();
    this.uploadDataToFirebase(subscriptions, 'subscribe');
  }
  uploadUsersToFirebase(): void {
    const users = this.userRepository.getUsers();
    this.uploadDataToFirebase(users, 'user');
  }
}


