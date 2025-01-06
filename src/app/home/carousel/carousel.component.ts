import { Component, ViewChild, ElementRef } from '@angular/core';
import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  slider: Slider = new Slider();

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {}

   getSliders():Slider[]{
      return this.sliderService.getActiveSliders();
    }

}
