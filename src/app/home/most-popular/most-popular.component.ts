import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ProductList } from '../../models/productList';
import { forkJoin, map, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styles: [``]
})
export class MostPopularComponent {
  products: ProductList[] = [];
  defaultTransform: number = 0;
  @ViewChild('popular', { static: true }) popular!: ElementRef;
  constructor(
    private productService: ProductService,
    private renderer: Renderer2,
  ) { }
  ngOnInit(): void {
    console.log("ngOnInit çalıştı!"); // Bu logu ekleyin
    this.getProducts();
    setTimeout(() => {  this.go(true)  }, 3000);
  }
  go(next: boolean): void {
    const popularElement = this.popular.nativeElement;

    if (next) {
      this.defaultTransform -= 398;
      if (Math.abs(this.defaultTransform) >= popularElement.scrollWidth - popularElement.clientWidth) {
        this.defaultTransform = 0;
      }
    } else {
      if (this.defaultTransform !== 0) {
        this.defaultTransform += 398;
      }
    }

    this.renderer.setStyle(
      popularElement,
      'transform',
      `translateX(${this.defaultTransform}px)`
    );
  }
  // getProducts(): void{
  //   this.productService.getProductItemsByViewCount()
  //       .subscribe(
  //         (data) => {
  //           this.products = data;
  //       }
  //     );
  // }
  getProducts(): void {
    this.productService.getProductItemsByViewCount().subscribe(
      (data) =>
        this.products = data
    )
  }
}
