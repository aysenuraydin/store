
import { Order } from "./order";
import { AdressItem } from './adressItem';
import { Product } from "./product";
import { CartItem } from "./cart";

export class User {
    id:number;
    name:string
    createdAt?: Date;

    adressItems: AdressItem[];
    cartItems: CartItem[];
    orders: Order[];
    favItems: Product[];
    recentlyItems: Product[];

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



