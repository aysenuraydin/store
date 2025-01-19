import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styles: [``]
})
export class CarouselComponent implements OnInit, OnDestroy {
  sliders: Slider[] = [];
  private intervalId: any;

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.startAutoScroll();

    this.sliderService.currentSlider$.subscribe((s) => {
      this.sliders = s
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getSliders(): void {
    this.sliderService.getActiveSliders().subscribe(data => {
      this.sliders = data;
    });
  }

  startAutoScroll(): void {
    const scrollInterval = 3000;
    this.intervalId = setInterval(() => {
      const carousel = document.querySelector('.carousel-slides') as HTMLElement;
      if (carousel) {
        carousel.scrollLeft += carousel.offsetWidth;
      }
    }, scrollInterval);
  }
}
