import { Component } from '@angular/core';
import { ProductList } from '../../models/productList';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: [``]
})
export class ProductListComponent {

  products: ProductList[] = [];
  query: string = "";
  routeId: number = 0;
  toggleValue = true;
  pageNumber:number = 1;
  pageSize:number = 9;
  pageTotal:number = 1;

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';

      if (this.query) {
        this.getFilterProducts();
      } else {
        this.routeId = Number(this.route.snapshot.paramMap.get('id'));
        this.getProducts();
      }
    });
  }
  getrouterId(categoryId:number){
    this.routeId=categoryId;
    if(this.query.length==0)this.getProducts();
    else this.getFilterProducts();
  }
  getProducts(): void{
    this.productService.getProductItemsByCategoryId(this.routeId,this.pageNumber, this.pageSize)
      .subscribe(
        (data) => {
          console.log(this.query,this.routeId);
          this.products = data.products;
          this.pageTotal = data.totalPages;
      }
    );
  }
  getFilterProducts(): void{
    this.productService.searchProducts(this.query,this.routeId,this.pageNumber, this.pageSize)
      .subscribe(
        (data) => {
          console.log(this.query,this.routeId);
          this.products = data.products;
          this.pageTotal = data.totalPages;
      }
    );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.query.length==0) this.getProducts();
    else this.getFilterProducts();
  }
  showOrHide(value:boolean){
    this.toggleValue = !this.toggleValue;
  }
  colorOpacity(hex: string="") {
    return hex+'30';
  }
}
