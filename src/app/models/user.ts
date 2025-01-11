
import { Order } from "./order";
import { AdressItem } from './adressItem';
import { CartItem } from "./cart";
import { RecentlyItem } from "./recentlyItem";
import { FavItem } from "./favItem";

export class User {
    id:number;
    name:string
    createdAt?: Date;

    adressItems: AdressItem[];
    cartItems: CartItem[];
    orders: Order[];
    favItems: FavItem[];
    recentlyItems: RecentlyItem[];

    constructor() {
      this.id = 0;
      this.name = '';
      this.createdAt = new Date();
      this.adressItems = [];
      this.cartItems = [];
      this.orders = [];
      this.favItems = [];
      this.recentlyItems = [];
    }
}



