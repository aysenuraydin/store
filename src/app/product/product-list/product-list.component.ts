import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  category: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {  }

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
