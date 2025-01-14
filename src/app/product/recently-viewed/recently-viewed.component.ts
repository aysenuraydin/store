import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { RecentlyService } from '../../services/recently.service';
import { ProductList } from '../../models/productList';

@Component({
  selector: 'recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrl: './recently-viewed.component.css'
})
export class RecentlyViewedComponent {
  products: ProductList[] = [];

  constructor(private recentlService: RecentlyService) {  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void{
    this.recentlService.getRecentlyItems()
        .subscribe(
          (data) => {
            this.products = data.reverse();
          }
      );
  }
}
