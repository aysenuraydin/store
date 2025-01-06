import { Slider } from "../models/slider";

export class SliderRepository {
  private slider: Slider[];

  constructor() {
      this.slider = new Array<Slider>(
          {
            id:1,
            name: 'Earthen Bottle 1',
            imgUrl:'https://cache.manuka.com.tr/elfinder/files/Home2024/Bohomania/lp/desktop/kapak.webp',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:2,
            name: 'Earthen Bottle 2',
            imgUrl:'https://cache.manuka.com.tr/elfinder/files/Home2024/Bohomania/home/desktop/tr/slider1_1.webp',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:3,
            name: 'Earthen Bottle 2',
            imgUrl:'https://via.placeholder.com/150',
            createdAt: new Date(),
            isActive: false
          },
          {
            id:4,
            name: 'Earthen Bottle 2',
            imgUrl:'https://via.placeholder.com/150',
            createdAt: new Date(),
            isActive: false
          }
      );
  }
  getSliders(): Slider[] {
    return this.slider;
  }
}


