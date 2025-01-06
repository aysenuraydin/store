import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  getProducts(): Product[] {
    return this.productService.getProducts();
  }
}
