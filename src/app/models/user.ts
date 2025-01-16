
import { Order } from "./order";
import { AdressItem } from './adressItem';
import { CartItem } from "./cart";
import { RecentlyItem } from "./recentlyItem";
import { FavItem } from "./favItem";
import { Review } from "./review";

export class User {
    id:number;
    name:string
    surname:string
    email:string
    phone:number;
    createdAt: Date;
    roleId:number;
    password:string;

    adressItems?: AdressItem[];
    cartItems?: CartItem[];
    orders?: Order[];
    favItems?: FavItem[];
    recentlyItems?: RecentlyItem[];
    reviews?: Review[];

    constructor(
      /*
      id: number = 0,
      name: string = '',
      surname: string = '',
      email: string = '',
      phone: number = 0,
      createdAt: Date = new Date(),
      roleId: number = 2,
      password: string = '',
      adressItems: AdressItem[] = [],
      cartItems: CartItem[] = [],
      orders: Order[] = [],
      favItems: FavItem[] = [],
      recentlyItems: RecentlyItem[] = [],
      reviews: Review[] = []
      */
    ) {
      this.id = 0;
      this.roleId = 2;
      this.name = '';
      this.surname = '';
      this.email = '';
      this.phone = 0;
      this.password = '';
      this.createdAt = new Date();
      this.adressItems = [];
      this.cartItems = [];
      this.orders = [];
      this.favItems = [];
      this.recentlyItems = [];
      this.reviews = [];
    }
}





