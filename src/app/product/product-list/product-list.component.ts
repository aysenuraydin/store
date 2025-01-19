import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductList } from '../../models/productList';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoryProductService } from '../../services/category-product.service';
import { AlertService } from '../../services/alert.service';
import { Alert, ClassName, Color } from '../../models/alert';

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
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';

      if (this.query) {
         this.getFilterProducts(this.query);
        // this.categoryProductService.currentsearchProducts$.subscribe((categories) => {
        //   this.products = categories
        // });
      } else {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (!isNaN(id)) {
          this.getProducts(id);

        }
      }
    });
        let alert:Alert =  {
          id:1,
          userId:1,
          className: ClassName.info,
          message:"Lorem ing elit.1",
          color: Color.blue
        }
        this.alertService.addAlert(alert)
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
    // this.productService.getProductItemsByCategoryId(id);
    // this.productService.currentProductItemsByCategoryId$.subscribe((categories) => {
    //   this.products = categories
    // });
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
