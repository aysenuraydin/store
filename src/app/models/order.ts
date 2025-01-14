import { v4 as uuidv4 } from 'uuid';

export class Order {
    id:number;
    userId: number;
    createdAt: Date;
    orderItems: OrderItem[];
    orderCode: string;
    orderState: OrderState;
    adressId: number;

    constructor() {
      this.id = 0;
      this.userId = 0;
      this.createdAt = new Date();
      this.orderItems = [];
      this.orderCode = uuidv4().slice(0,16);
      this.orderState = OrderState.inProgress;
      this.adressId = 0;
  }
}
export class OrderList {
  id:number;
  userId: number;
  createdAt: Date;
  orderItems: OrderItem[];
  orderCode: string;
  orderState: OrderState;
  adressId: number;
  adressFullname: string;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.createdAt = new Date();
    this.orderItems = [];
    this.orderCode = uuidv4().slice(0,16);
    this.orderState = OrderState.inProgress;
    this.adressId = 0;
    this.adressFullname = "";
}
}
export class OrderItem {
  id:number;
  orderId: number;
  quantity: number;
  unitPrice: number;
  name: string;
  imgUrl: string;
  orderState: OrderState;

  constructor() {
    this.id = 0;
    this.orderId = 0;
    this.quantity = 0;
    this.unitPrice = 0;
    this.name = "";
    this.imgUrl = "";
    this.orderState = OrderState.inProgress;
  }
}

export enum OrderState {
  inProgress="In Progress",
  delivered="Delivered",
  returns="Returns",
  cancellations="Cancellations"
};




