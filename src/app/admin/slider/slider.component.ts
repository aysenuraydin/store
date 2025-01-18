import { Component } from '@angular/core';
import { Slider } from '../../models/slider';
import { SliderService } from '../../services/slider.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styles: [``]
})
export class SliderComponent {

  slider: Slider = new Slider();
  sliders: Slider[] = [];
  disableSliders: Slider[] = [];
  activeSliders: Slider[] = [];
  buttonVisible:boolean = true;
  search:string = "";
  constructor(private sliderService: SliderService) { }

  ngOnInit(): void {
    this.getSliders();
  }
  Search() {
    this.getQuerySliders();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQuerySliders();
  }
  Clear() {
    this.search = "";
    this.getSliders();
  }
  getQuerySliders(): void{
      this.sliderService.searchSliders(this.search)
          .subscribe(
            (data) => {
              this.sliders = data;
          }
        );
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }

  getSliders(): void {
    forkJoin({
      active: this.sliderService.getActiveSliders(),
      disabled: this.sliderService.getDisableSliders(),
    }).subscribe(({ active, disabled }) => {
      this.activeSliders = active;
      this.disableSliders = disabled.reverse().slice(0, 9);
      this.sliders = [...this.activeSliders, ...this.disableSliders];
    });
  }
  getActiveSliders():  void {
    this.sliderService.getActiveSliders()
      .subscribe(
        (data) => {
          this.activeSliders = data.reverse();
      }
    );
  }
  getDisableSliders():  void {
    this.sliderService.getDisableSliders()
      .subscribe(
        (data) => {
          this.disableSliders = data.reverse().slice(0,9);
      }
    );
  }
  editSlider(id: number): void {
    this.sliderService.getSlider(id)
    .subscribe(
      (data) => {
        this.slider = data;
      }
    );
    this.toggleWindow(true);
  }
  saveSlider(slider:Slider):void{
    slider.id
      ? this.updateSlider(slider)
      : this.createSlider(slider);

      this.cancel();
  }
  createSlider(slider: Slider): void {
    this.sliderService.createSubscribe(slider).subscribe(() => {
      this.getSliders();
    });
  }
  updateSlider(slider:Slider):void{
    this.sliderService.updateSubscribe(slider).subscribe(() => {
    this.getSliders();
    });
  }
  deleteSlider(id: number): void {
    this.sliderService.deleteSubscribe(id).subscribe();
    this.getSliders();
    this.cancel();
  }

  cancel():void{
    this.slider = new Slider();
  }
}
