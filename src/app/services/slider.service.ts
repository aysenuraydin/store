import { Injectable } from '@angular/core';
import { SliderRepository } from '../repository/slider.repository';
import { Slider } from '../models/slider';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

    private dataSource: SliderRepository;
    private sliders: Slider[];

    constructor(private http: HttpClient) {
      this.dataSource = new SliderRepository();
      this.sliders = new Array<Slider>();

      this.dataSource.getSliders().forEach(p => this.sliders.push(p));
    }

    getSliders() :Slider[] {
      return this.sliders;
    }
    getActiveSliders() :Slider[] {
      return this.sliders.filter(s=>s.isActive);
    }
    getDisableSliders() :Slider[] {
      return this.sliders.filter(i=>!i.isActive);
    }

    getSlider(id:number) :Slider | undefined {
        return this.sliders.find(i=>i.id==id);
      }

      createSlider(product: Slider): void{
        product.id=(this.sliders.at(-1)?.id?? 0) + 1;
        // product.createdAt= new Date();
        this.sliders.push(product);
      }

      updateSlider(product: Slider): void {
        const index = this.sliders.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.sliders[index] = product;
        }
      }
      deleteSlider(id: number): void {
        const index = this.sliders.findIndex(p => p.id === id);
        if (index !== -1) {
          this.sliders.splice(index, 1);
        }
      }
}
