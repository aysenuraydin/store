import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  activeTab: Number = 1;
  product: Product = new Product();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }
  getProduct(id:number):void{
    this.productService.getProduct(id)
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
