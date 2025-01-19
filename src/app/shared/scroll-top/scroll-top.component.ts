import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'scroll-top',
  templateUrl: './scroll-top.component.html',
  styles: [``]
})
export class ScrollTopComponent {
  private scrollBreakpoint = window.innerHeight * 0.9;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollButton = this.el.nativeElement.querySelector('.scroll-top');
    const scrollOffset = window.scrollY;

    if (scrollOffset >= this.scrollBreakpoint) {
      this.renderer.addClass(scrollButton, 'visible');
      this.renderer.removeClass(scrollButton, 'hidden');
    } else {
      this.renderer.addClass(scrollButton, 'hidden');
      this.renderer.removeClass(scrollButton, 'visible');
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
