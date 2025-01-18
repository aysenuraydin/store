export class CartItem {
  id:number;
  userId: number;
  // productId: number;
  quantity: number;
  createdAt?: Date;
  name: string;
  price: number;
  imgUrl: string;


  constructor() {
    this.id = 0;
    this.userId = 0;
    // this.productId = 0;
    this.quantity = 1;
    this.createdAt = new Date();;
    this.name = '';
    this.price = 0;
    this.imgUrl = 'https://dummyimage.com/600x500/ccc/aaa';
  }
}






