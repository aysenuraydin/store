import { Review } from "../models/review";


export class ReviewRepository {
  private reiew: Review[];

  constructor() {
      this.reiew = new Array<Review>(
          {
            id:1,
            text: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. 1',
            starCount :3,
            isConfirmed :false,
            createdAt: new Date(),
            userId :2,
            productId :1
          },
          {
            id:2,
            text: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. 2',
            starCount :5,
            isConfirmed :true,
            createdAt: new Date(),
            userId :2,
            productId :5
          },
          {
            id:3,
            text: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. 3',
            starCount :4,
            isConfirmed :false,
            createdAt: new Date(),
            userId :3,
            productId :5
          },
          {
            id:4,
            text: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. 4',
            starCount :2,
            isConfirmed :true,
            createdAt: new Date(),
            userId :4,
            productId :4
          },
          {
            id:5,
            text: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. 5',
            starCount :5,
            isConfirmed :false,
            createdAt: new Date(),
            userId :5,
            productId :4
          },
          {
            id:6,
            text: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. 6',
            starCount :4,
            isConfirmed :true,
            createdAt: new Date(),
            userId :6,
            productId :4
          },
          {
            id:7,
            text: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. 7',
            starCount :5,
            isConfirmed :true,
            createdAt: new Date(),
            userId :7,
            productId :4
          },
      );
  }
  getReviews(): Review[] {
    return this.reiew;
  }
}


