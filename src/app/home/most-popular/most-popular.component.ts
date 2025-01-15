import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductList } from '../../models/productList';
import { forkJoin, map, switchMap } from 'rxjs';
import { FavService } from '../../services/fav.service';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.css'
})
export class MostPopularComponent {
  products: ProductList[] = [];

  constructor(
    private productService: ProductService,
    private favService: FavService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  // getProducts(): void{
  //   this.productService.getProducts()
  //       .subscribe(
  //         (data) => {
  //           this.products = data.sort((a, b) => b.viewCount - a.viewCount).slice(0,10);
  //       }
  //     );
  // }

  getProducts(): void{
    this.productService.getProductItemsByViewCount()
        .subscribe(
          (data) => {
            this.products = data;
        }
      );
  }

  // getProducts2(): void {
  //   this.productService.getProducts()
  //     .pipe(
  //       map(data => data.reverse()),
  //       switchMap(products => {
  //         const productsWithFavStatus$ = products
  //         .sort((a, b) => b.viewCount - a.viewCount).slice(0,10)
  //         .map(product =>
  //           this.favService.isOrNot(product.id).pipe(
  //             map(isFav => ({
  //               ...product,
  //               isFav
  //             }))
  //           )
  //         );
  //         return forkJoin(productsWithFavStatus$);
  //       })
  //     )
  //     .subscribe(
  //       (productsWithFavStatus) => {
  //         this.products = productsWithFavStatus;
  //       }
  //     );
  // }
}
