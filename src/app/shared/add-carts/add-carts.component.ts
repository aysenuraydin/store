import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductList } from '../../models/productList';
import { CartItem } from '../../models/cart';
import { AdressItem } from '../../models/adressItem';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AdressItemService } from '../../services/adress.service';

@Component({
  selector: 'add-carts',
  templateUrl: './add-carts.component.html',
  styleUrl: './add-carts.component.css'
})
export class AddCartsComponent {
  @Output() isCartVisible = new EventEmitter<boolean>();
  visible:boolean = true;
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
  remove(id: number): void{
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
  close(): void{
    this.visible = false;
    this.isCartVisible.emit(false);
  }
  goCart(): void{
    this.close();
    this.router.navigate(['/cart']);
  }
}
