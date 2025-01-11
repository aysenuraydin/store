import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { FavService } from '../../services/fav.service';

@Component({
  selector: 'add-fav',
  templateUrl: './add-fav.component.html',
  styleUrl: './add-fav.component.css'
})
export class AddFavComponent {
  products: Product[] = [];

  constructor(private favService: FavService) {  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void{
    this.favService.getFavItems()
        .subscribe(
          (data) => {
            data.map(d =>
              this.products.push({
                id : d.id,
                name : d.name,
                price : d.price,
                imgUrl : d.imgUrl,
                description : "",
                details : ""
              })
            )
          }
      );
  }
}
