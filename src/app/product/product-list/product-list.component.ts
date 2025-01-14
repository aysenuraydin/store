import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductList } from '../../models/productList';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: ProductList[] = [];
  // categoryId: number = 1;

  routerId: number = 0;
  toggleValue = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProducts(id);
  }

  getProducts(id:number): void{
    this.productService.getProductsByCategoryId(id)
        .subscribe(
          (data) => {
            this.products = data;
        }
      );
  }

  showOrHide(value:boolean){
    this.toggleValue = !this.toggleValue;
  }
  colorOpacity(hex: string="") {
    return hex+'30';
  }
}
