
import { Order, OrderState } from "../models/order";

export class OrderRepository {
  private orders: Order[];

  constructor() {
      this.orders = [
        {
          id:1,
          userId:1,
          createdAt: new Date(),
          orderCode:"85964cc3-2588-4a",
          adressId:2,
          orderState: OrderState.delivered,
          orderItems: [
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg",
              orderState: OrderState.inProgress,
            },
            {
              id:1,
              orderId:1,
              quantity:3,
              unitPrice:11,
              name:"deneme",
              imgUrl:"https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg",
              orderState: OrderState.inProgress,
            }
          ]
        }
      ];
  }
  getOrders(): Order[] {
    return this.orders;
  }
}


