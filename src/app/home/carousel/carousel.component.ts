import { Component, ViewChild, ElementRef } from '@angular/core';
import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styles: [``]
})
export class CarouselComponent {
  sliders: Slider[] = [];

  class:string ="";

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.getSliders();
  }

  getSliders():  void {
    this.sliderService.getActiveSliders()
      .subscribe(
        (data) => {
          this.sliders = data;
      }
    );
  }
}
