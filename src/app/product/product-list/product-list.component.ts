import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductList } from '../../models/productList';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FavService } from '../../services/fav.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { CategoryProductService } from '../../services/category-product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [``]
})
export class ProductListComponent {

  products: ProductList[] = [];
  query: string = "";
  toggleValue = true;

  constructor(
    private productService: ProductService,
    private categoryProductService: CategoryProductService,
    private route: ActivatedRoute,
  ) {  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.query = params['query'];
  //     if(this.query.length>0) this.getFilterProducts(params['query']);
  //     else{
  //       let id = Number(this.route.snapshot.paramMap.get('id'));
  //       this.getProducts(id);
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';

      if (this.query) {
        this.getFilterProducts(this.query);
      } else {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (!isNaN(id)) {
          this.getProducts(id);
        }
      }
    });
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
  getFilterProducts(query:string): void{
    this.categoryProductService.searchProducts(query)
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
