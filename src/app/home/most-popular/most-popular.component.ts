import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductList } from '../../models/productList';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.css'
})
export class MostPopularComponent {
  products: ProductList[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void{
    this.productService.getProducts()
        .subscribe(
          (data) => {
            this.products = data.sort((a, b) => b.viewCount - a.viewCount).slice(0,10);
            //ileride viewCounta göre sırala
        }
      );
  }
}
