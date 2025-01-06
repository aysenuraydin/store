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
      );
  }
  getSubscribe(): Subscribe[] {
    return this.subscribe;
  }
}


