import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  categoryId: number = 1;

  routerId: number = 0;
  toggleValue = true;

  ngOnInit(): void {
    this.getProducts();
  }
  constructor(
    private productService: ProductService,
    // private route: ActivatedRoute
  ) {  }

  getProducts(id:number = 0, value?:string): void{
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
