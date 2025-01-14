import { Component } from '@angular/core';
import { ProductList } from '../../models/productList';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'add-carts',
  templateUrl: './add-carts.component.html',
  styleUrl: './add-carts.component.css'
})
export class AddCartsComponent {
    products: ProductList[] = [];

    constructor(private cartService: CartService) {  }

    ngOnInit(): void {
      this.getProducts();
    }
    getProducts(): void{
      this.cartService.getCartItems()
          .subscribe(
            (data) => {
              this.products= data;
            }
        );
    }
}
