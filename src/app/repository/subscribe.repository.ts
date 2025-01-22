import { Subscribe } from "../models/Subscribe";

export class SubscribeRepository {
  private subscribe: Subscribe[];

  constructor() {
      this.subscribe = new Array<Subscribe>(
          {
            id:1,
            email: 'john.doe@example.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:2,
            email: 'jane.smith@example.com',
            createdAt: new Date(),
            isActive: false
          },
          {
            id:3,
            email: 'mark.jones@example.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:4,
            email: 'lucy.brown@example.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:5,
            email: 'chris.green@example.com',
            createdAt: new Date(),
            isActive: false
          },
          {
            id:6,
            email: 'patricia.white@example.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:7,
            email: 'david.black@example.com',
            createdAt: new Date(),
            isActive: true
          },
      );
  }
  getSubscribes(): Subscribe[] {
    return this.subscribe;
  }
}
