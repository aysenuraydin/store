import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FavService } from '../../services/fav.service';
import { ProductList } from '../../models/productList';
import { Router } from '@angular/router';

@Component({
  selector: 'add-fav',
  templateUrl: './add-fav.component.html',
  styleUrl: './add-fav.component.css'
})
export class AddFavComponent {
   @Output() isFavVisible = new EventEmitter<boolean>();
  products: ProductList[] = [];
  visible:boolean = true;
  constructor(private favService: FavService, private router: Router) {  }

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
  close(): void{
    this.visible = false;
    this.isFavVisible.emit(false);
  }
  goFav(): void{
    this.close();
    this.router.navigate(['/fav']);
  }
  heartClick(product: ProductList): void {
    product.isFav = !product.isFav;
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
