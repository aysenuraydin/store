import { Component } from '@angular/core';
import { FavService } from '../services/fav.service';
import { ProductList } from '../models/productList';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
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
