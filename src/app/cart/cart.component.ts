import { Component } from '@angular/core';
import { CartItem } from '../models/cart';
import { CartService } from '../services/cart.service';
import { AdressItemService } from '../services/adress.service';
import { AdressItem } from '../models/adressItem';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItem: CartItem = new CartItem();
  cartItems: CartItem [] = [];
  total: number = 0;
  adressItems: AdressItem[] = [];
  showOrHide = true;
  selectedAddressId: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrderService,
    private adressItemService: AdressItemService
  ) {}

  ngOnInit(): void {
    this.getAdressItems();
    this.getCartItems();
  }

  getAdressItems(): void{
    this.adressItemService.getAdressItems()
        .subscribe(
          (data) => {
            this.adressItems = data;
        }
      );
  }
  getCartItems(): void{
    this.cartService.getCartItems()
        .subscribe(
          (data) => {
            this.cartItems = data;
            this.calculateAllTotal();
        }
      );
  }
  updateCart(product:CartItem,quantity:number):void{
    product.quantity=quantity;
    this.cartService.updateCartItem(product).subscribe(
      (data) => {
        this.getCartItems();
        this.calculateAllTotal();
      }
    );
  }
  deleteCartItems(id: number): void{
    this.cartService.deleteCartItem(id)
      .subscribe(
        (data) => {
          this.getCartItems();
          this.calculateAllTotal();
      }
    );
  }
  calculateTotal(price: number, quantity: number): number {
    return price * quantity;
  }
  calculateAllTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  saveOrder(): void {
    this.orderService.createOrder(this.cartItems, this.selectedAddressId).subscribe(
      data => {
        this.cartService.deleteAllCartItems().subscribe(
          d=> this.router.navigate([`/cart/cart-confirm/${data.id}`])
        );
      }
    );
  }
}
