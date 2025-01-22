import { Slider } from "../models/slider";

export class SliderRepository {
  private slider: Slider[];

  constructor() {
      this.slider = new Array<Slider>(
          {
            id: 1,
            name: 'Slider 1',
            imgUrl: 'https://dummyimage.com/600x500/ccc/aaa',
            createdAt: new Date(),
            isActive: true
          },
          {
            id: 2,
            name: 'Slider 2',
            imgUrl: 'https://dummyimage.com/600x500/ccc/aaa',
            createdAt: new Date(),
            isActive: true
          },
          {
            id: 3,
            name: 'Slider 3',
            imgUrl: 'https://dummyimage.com/600x500/ccc/aaa',
            createdAt: new Date(),
            isActive: false
          },
          {
            id: 4,
            name: 'Slider 4',
            imgUrl: 'https://dummyimage.com/600x500/ccc/aaa',
            createdAt: new Date(),
            isActive: false
          }
      );
  }
  getSliders(): Slider[] {
    return this.slider;
  }
}
