import { Slider } from "../models/slider";

export class SliderRepository {
  private slider: Slider[];

  constructor() {
      this.slider = new Array<Slider>(
          {
            id: 1,
            name: 'Slider 1',
            imgUrl: 'https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2024/04/arabanner_karne.webp?w=1920&quality=80&ssl=1',
            createdAt: new Date(),
            isActive: true
          },
          {
            id: 2,
            name: 'Slider 2',
            imgUrl: 'https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2025/01/iphone_havale_arabanner.webp?w=1920&quality=80&ssl=1',
            createdAt: new Date(),
            isActive: false
          },
          {
            id: 3,
            name: 'Slider 3',
            imgUrl: 'https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2024/07/iPadAirBundle_17Ocak2025_AraBanner.webp?w=1920&quality=80&ssl=1',
            createdAt: new Date(),
            isActive: true
          },
          {
            id: 4,
            name: 'Slider 4',
            imgUrl: 'https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2024/07/iPad_10_Nesil_Arabanner.jpg?w=1920&quality=89&ssl=1',
            createdAt: new Date(),
            isActive: true
          }
      );
  }
  getSliders(): Slider[] {
    return this.slider;
  }
}
