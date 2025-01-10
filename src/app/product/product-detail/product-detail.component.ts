import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CategoryProductService } from '../../services/category-product.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  activeTab: Number = 2;
  // activeTab: Number = 0;
  product: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryProductService: CategoryProductService
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }
  toggleWindow(value:number) :void {
    if(this.activeTab==value)  this.activeTab = 0
    else this.activeTab = value;
  }
  getProduct(id:number):void{
    this.categoryProductService.getProductWithCategoryName(id)
    .subscribe(
      (data) => {
        this.product = data;
      }
    );
  }
  loadProducts() {
    this.router.navigate(['/products'], {
      queryParams: {
        page: 1
      }
    });
  }
}
