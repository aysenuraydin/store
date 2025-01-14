export class Product {
    id:number;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    categoryId?: number;
    isConfirmed?: boolean;
    isFav?: boolean; //bunu kaldır
    createdAt?: Date;
    details:string;
    stockAmount?: number;
    // commentId?: number
    viewCount:number;

    constructor() {
      this.id = 0;
      this.name = '';
      this.price = 0;
      this.imgUrl = 'https://via.placeholder.com/150';
      this.description = '';
      this.categoryId = 1;
      this.isConfirmed= true;
      this.isFav= false;
      this.createdAt = new Date();
      this.details='';
      this.stockAmount= 0;
      this.viewCount= 0;

      // Array<ProductComment>
      // Array<OrderItem>
      // Array<CartItem>
      // Array<ProductImage>
      // Array<ProductFav>
  }
}










