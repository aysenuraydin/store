import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductService } from '../../services/category-product.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/reiew.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  activeTab: Number = 0;
  product: any;
  averageReviews:number = 0;
  reviewsCount:number = 0;
  fullStars: any[] = [];
  hasHalfStar: boolean = false;
  emptyStars: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryProductService: CategoryProductService,
    private reviewService: ReviewService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }

  getStarState() :void {
      const fullStarCount = Math.floor(this.averageReviews);
      const hasHalfStar = this.averageReviews % 1 !== 0;
      const emptyStarCount = 5 - fullStarCount - (hasHalfStar ? 1 : 0);

      this.fullStars = Array(fullStarCount);
      this.hasHalfStar = hasHalfStar;
      this.emptyStars = Array(emptyStarCount);
    }
  getAverange() :void {
    this.reviewService.getAverageAndCountByProductId(this.product.id)
      .subscribe(
        (data) => {
          this.averageReviews=data.average;
          this.reviewsCount=data.count;
          this.getStarState();
      }
    );
  }

  getProduct(id:number):void{
    this.categoryProductService.getProductWithCategoryName(id)
    .subscribe(
      (data) => {
        this.product = data;
        this.getAverange();
      }
    );
  }
  toggleWindow(value:number) :void {
    if(this.activeTab==value)  this.activeTab = 0
    else this.activeTab = value;
  }
  addCart(product:any):void{
    this.cartService.crateOrUpdateCartItem(product).subscribe(
      (data) => {
        this.router.navigate(['/cart/']);
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


/*

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductService } from '../../services/category-product.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/reiew.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  activeTab: Number = 0;
  product: any;
  averangeReviews:number = 0;
  reviewsCount:number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryProductService: CategoryProductService,
    private reviewService: ReviewService,
    private cartService: CartService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }

    getAverange() :void {
      this.reviewService.getReviewsByProdurtId(this.product.id)
        .subscribe(
          (data) => {
            this.reviewsCount = data.length;
            this.averangeReviews = data.reduce((sum, item) => sum + item.starCount,0)
            / this.reviewsCount!= 0 ? this.reviewsCount : 10;
        }
      );
    }

  // getAverange() :void {
  //   this.reviewService.getAverageAndCountByProductId(this.product.id)
  //   .subscribe(
  //     (data) =>{
  //       this.averangeReviews = data.average;
  //       this.reviewsCount = data.count;
  //     }
  //   )
  // }
  getProduct(id:number):void{
    this.categoryProductService.getProductWithCategoryName(id)
    .subscribe(
      (data) => {
        this.product = data;
        this.getAverange();
      }
    );
  }
  toggleWindow(value:number) :void {
    if(this.activeTab==value)  this.activeTab = 0
    else this.activeTab = value;
  }
  addCart(product:any):void{
    this.cartService.crateOrUpdateCartItem(product).subscribe(
      (data) => {
        this.router.navigate(['/cart/']);
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
  // getAverange() :void {
  // this.reviewService.getReviewsByProdurtId(this.product.id)
  //   .subscribe(
  //     (data) => {
  //       this.reviewsCount = data.length;
  //       this.averangeReviews
  //       = data.reduce((sum, item) => sum + item.starCount, 0)
  //       / this.reviewsCount!= 0 ? this.reviewsCount : 100;
  //   }
  // );
  // }


*/
