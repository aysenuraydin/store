import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductList } from '../../models/productList';
import { ActivatedRoute, Router } from '@angular/router';
import { FavService } from '../../services/fav.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [``]
})
export class ProductListComponent {

  products: ProductList[] = [];
  toggleValue = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
     private favService: FavService
  ) {  }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProducts(id);
  }

  getrouterId(categoryId:number){
    this.getProducts(categoryId);
  }
  getProducts(id:number): void{
    this.productService.getProductItemsByCategoryId(id)
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
