import { Component } from '@angular/core';
import { ProductList } from '../models/productList';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styles: [``]
})
export class FavoriteComponent {
  products: ProductList[] = [];

  constructor(private favService: FavService) {  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void{
    this.favService.getFavItems()
        .subscribe(
          (data) => {
            this.products= data;
          }
      );
  }
}
