export class Order {
    id:number;
    userId: number;
    createdAt: Date;
    orderItems?: OrderItem[];
    orderCode: string;

    constructor() {
      this.id = 0;
      this.userId = 0;
      this.createdAt = new Date();
      this.orderItems = [];
      this.orderCode = '';
  }
}

export class OrderItem {
  id:number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;

  constructor() {
    this.id = 0;
    this.productId = 0;
    this.orderId = 0;
    this.quantity = 0;
    this.unitPrice = 0;
  }
}


