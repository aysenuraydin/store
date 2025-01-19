import { Component, Input, OnInit } from '@angular/core';
import { ProductList } from '../models/productList';
import { ProductService } from '../services/product.service';
import { FavService } from '../services/fav.service';
import { RecentlyService } from '../services/recently.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styles: [``]
})
export class ProductComponent implements OnInit{

  @Input() product: ProductList |undefined

  constructor(
    private productService: ProductService,
    private recentlService: RecentlyService,
    private favService: FavService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  ProductDetailClick(product: ProductList): void {
    this.addToRecenty(product);
    this.addViewCount(product.id);
  }
  addToRecenty(product:ProductList){
    this.recentlService.createRecentlyItem(product).subscribe();
  }
  addViewCount(id:number){
    this.productService.getProduct(id).subscribe(
      (data) =>
      {
        data.viewCount = data.viewCount + 1;
        this.productService.updateProduct(data).subscribe();
      }
    )
  }
  addCart(product:any):void{
    this.cartService.createOrUpdateCartItem(product).subscribe(
      (data) => {
        this.router.navigate(['/cart/']);
      }
    );
  }
  heartClick(product: ProductList): void {
    this.product?.isFav , product.isFav = !product.isFav;
    if( product.isFav) this.createFav(product);
    else this.deleteFav(product.id);
  }
  createFav(product:ProductList){
    this.favService.createFavItem(product).subscribe();
  }
  deleteFav(id:number){
    this.favService.deleteFavItem(id).subscribe();
  }
}
