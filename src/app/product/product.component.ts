import { Component, Input, OnInit } from '@angular/core';
import { ProductList } from '../models/productList';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  @Input() product: ProductList |undefined



    constructor(private productService: ProductService) {}

    ngOnInit(): void {}

    //! Favori Durumunu Değiştir, favori service ile favori ürünlere ekle?
    heartClick(id: number): void {
      if (!id) {
        return;
      }

      this.productService.getProduct(id).subscribe(
        (product: Product) => {
          if (product) {
            product.isFav = !product.isFav;

            this.productService.updateProduct(product).subscribe(
              () => {
                if (this.product) this.product.isFav = product.isFav;
              },
              (error) => console.error('Ürün güncellenirken hata oluştu:', error)
            );
          }
        },
        (error) => console.error('Ürün alınırken hata oluştu:', error)
      );
    }
  }
