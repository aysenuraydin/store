import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductService } from '../../services/category-product.service';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/reiew.service';
import { FavService } from '../../services/fav.service';
import { ProductList } from '../../models/productList';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styles: [``]
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
    private favService: FavService,
    private reviewService: ReviewService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }
  heartClick(product: ProductList): void {
    this.product?.isFav , product.isFav = !product.isFav;
    if( product.isFav) this.createFav();
    else this.deleteFav(product.id);

  }
  getFavState(){
    this.favService.isOrNot(this.product.id).subscribe(
      data=> this.product.isFav = data
    );
  }
  createFav(){
    this.favService.createFavItem(this.product).subscribe();
  }
  deleteFav(id:number){
    this.favService.deleteFavItem(id).subscribe();
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
        this.getFavState();
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
