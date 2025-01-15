import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ProductList } from '../models/productList';
import { FavService } from '../services/fav.service';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: ProductList[] = [];

  constructor(
    private productService: ProductService,
    private favService: FavService
  ) {  }

  ngOnInit(): void {
    this.getProducts();
  }
  // getProducts(): void{
  //   this.productService.getProducts()
  //       .subscribe(
  //         (data) => {
  //           this.products = data.reverse();
  //           this.products.map(i=>
  //             i.isFav = this.favService.isOrNot(i.id).subscribe()
  //           )
  //       }
  //     );
  // }

  getProducts(): void{
    this.productService.getProductItems()
        .subscribe(
          (data) => {
            this.products = data;
        }
      );
  }

  // getProducts(): void {
  //   this.productService.getProducts()
  //     .pipe(
  //       map(data => data.reverse()),
  //       switchMap(products => {
  //         const productsWithFavStatus$ = products.map(product =>
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
