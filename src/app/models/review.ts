export class Review {
    id:number;
    text:string;
    starCount:number;
    isConfirmed:boolean;
    createdAt?:Date;
    userId:number;
    productId:number;

    constructor() {
      this.id = 0;
      this.text = '';
      this.starCount = 0;
      this.isConfirmed = false;
      this.createdAt = new Date();
      this.userId = 0;
      this.productId = 0;
  }
}








