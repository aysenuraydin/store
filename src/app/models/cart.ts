export class CartItem {
  id:number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt?: Date;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.productId = 0;
    this.quantity = 0;
    this.createdAt = new Date();
  }
}






