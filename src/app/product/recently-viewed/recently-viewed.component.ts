import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrl: './recently-viewed.component.css'
})
export class RecentlyViewedComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  getProducts(): Product[] {
    return this.productService.getProducts();
  }
}
