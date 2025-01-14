import { Component } from '@angular/core';
import { FavService } from '../../services/fav.service';
import { ProductList } from '../../models/productList';

@Component({
  selector: 'add-fav',
  templateUrl: './add-fav.component.html',
  styleUrl: './add-fav.component.css'
})
export class AddFavComponent {
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
