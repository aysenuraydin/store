export class Slider {
    id?:number;
    name: string;
    imgUrl?: string;
    createdAt?: Date;
    isActive: Boolean;

    constructor() {
      this.id = 0;
      this.name = '';
      this.imgUrl = 'https://dummyimage.com/600x500/ccc/aaa';
      this.createdAt = new Date();
      this.isActive = false;
  }
}






