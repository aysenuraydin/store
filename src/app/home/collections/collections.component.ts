import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'collections',
  templateUrl: './collections.component.html',
  styles: [``]
})
export class CollectionsComponent {
 defaultTransform: number = 0;
  @ViewChild('collection', { static: true }) collection!: ElementRef;
    constructor( private renderer: Renderer2) { }
    ngOnInit(): void {
      setTimeout(() => {  this.go(true)  }, 3000);
    }

    go(next: boolean): void {
      const sliderElement = this.collection.nativeElement;

      if (next) {
        this.defaultTransform -= 398;
        if (Math.abs(this.defaultTransform) >= sliderElement.scrollWidth - sliderElement.clientWidth) {
          this.defaultTransform = 0;
        }
      } else {
        if (this.defaultTransform !== 0) {
          this.defaultTransform += 398;
        }
      }

      this.renderer.setStyle(
        sliderElement,
        'transform',
        `translateX(${this.defaultTransform}px)`
      );
    }

}
