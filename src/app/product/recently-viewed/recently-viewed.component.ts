import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RecentlyService } from '../../services/recently.service';
import { ProductList } from '../../models/productList';

@Component({
  selector: 'recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styles: [``]
})
export class RecentlyViewedComponent {
  products: ProductList[] = [];
  defaultTransform: number = 0;
  @ViewChild('recently', { static: false }) recently!: ElementRef;

  constructor(
    private recentlService: RecentlyService,
    private renderer: Renderer2,
  ) {  }

  ngOnInit(): void {
    this.getProducts();
  }
  go(value:boolean): void{
    const recentlyElement = this.recently.nativeElement;

    if (value) {
      this.defaultTransform -= 398;
      if (Math.abs(this.defaultTransform) >= recentlyElement.scrollWidth - recentlyElement.clientWidth) {
        this.defaultTransform = 0;
      }
    } else {
      if (this.defaultTransform !== 0) {
        this.defaultTransform += 398;
      }
    }

    this.renderer.setStyle(
      recentlyElement,
      'transform',
      `translateX(${this.defaultTransform}px)`
    );
  }
  getProducts(): void{
    this.recentlService.getRecentlyItems()
        .subscribe(
          (data) => {
            this.products = data;
          }
      );
  }
}
