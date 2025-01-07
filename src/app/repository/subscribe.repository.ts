import { Subscribe } from "../models/Subscribe";

export class SubscribeRepository {
  private subscribe: Subscribe[];

  constructor() {
      this.subscribe = new Array<Subscribe>(
          {
            id:1,
            email: 'ays1@ayd.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:2,
            email: 'ays2@ayd.com',
            createdAt: new Date(),
            isActive: false
          },
          {
            id:3,
            email: 'ays3@ayd.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:4,
            email: 'ays4@ayd.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:5,
            email: 'ays5@ayd.com',
            createdAt: new Date(),
            isActive: false
          },
          {
            id:6,
            email: 'ays6@ayd.com',
            createdAt: new Date(),
            isActive: true
          },
          {
            id:7,
            email: 'ays7@ayd.com',
            createdAt: new Date(),
            isActive: true
          },
      );
  }
  getSubscribes(): Subscribe[] {
    return this.subscribe;
  }
}


