export class Slider {
    id?:number;
    name?: string;
    imgUrl?: string;
    createdAt?: Date;
    isActive: Boolean;

    constructor() {
      this.id = 0;
      this.name = '';
      this.imgUrl = 'https://via.placeholder.com/150';
      this.createdAt = new Date();
      this.isActive = false;
  }
}






