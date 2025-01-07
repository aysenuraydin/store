import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.css'
})
export class MostPopularComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void{
    this.productService.getProducts()
        .subscribe(
          (data) => {
            this.products = data;
        }
      );
  }
}
