
import { CartItem } from "../models/cart";

export class CartItemRepository {
  private cartItems: CartItem[];

  constructor() {
      this.cartItems = [
      ];
  }
  getCartItems(): CartItem[] {
    return this.cartItems;
  }
}
