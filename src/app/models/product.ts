export class Product {
    id:number;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    categoryId?: number;
    isConfirmed?: boolean;
    createdAt?: Date;
    details:string;
    stockAmount?: number;
    // commentId?: number

    constructor() {
      this.id = 0;
      this.name = '';
      this.price = 0;
      this.imgUrl = 'https://via.placeholder.com/150';
      this.description = '';
      this.categoryId = 1;
      this.isConfirmed= true;
      this.createdAt = new Date();
      this.details='';
      this.stockAmount= 0;
  }
}






