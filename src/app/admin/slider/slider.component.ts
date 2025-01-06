import { Component } from '@angular/core';
import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  slider: Slider = new Slider();
  class:string ="";

  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
  }

  getSliders(): Slider[] {
    return this.sliderService.getSliders().reverse().slice(0,5);
  }
  getActiveBanners(): Slider[] {
    return this.sliderService.getActiveSliders();
  }
  getDisableBanners(): Slider[] {
    return this.sliderService.getDisableSliders();
  }
  saveSlider(slider:Slider):void{
    slider.id
      ? this.sliderService.updateSlider(slider)
      : this.sliderService.createSlider(slider);

    this.cancel();
  }
  deleteSlider(id:number):void{
    this.sliderService.deleteSlider(id);
    this.cancel();
  }
  editSlider(id:number):void{
    this.slider = this.sliderService.getSlider(id)?? new Slider();
  }
  cancel():void{
    this.slider = new Slider();
  }
}
