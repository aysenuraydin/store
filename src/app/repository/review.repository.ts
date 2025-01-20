import { Review } from "../models/review";


export class ReviewRepository {
  private reiew: Review[];

  constructor() {
      this.reiew = new Array<Review>(
          {
            id:1,
            text: 'Great buy for the price. Looks modern and sleek.',
            starCount :3,
            isConfirmed :false,
            createdAt: new Date(),
            userId :2,
            productId :1
          },
          {
            id:2,
            text: 'A bit too bulky for my space, but the quality is solid.',
            starCount :5,
            isConfirmed :true,
            createdAt: new Date(),
            userId :2,
            productId :5
          },
          {
            id:3,
            text: 'Perfect addition to my living room! Stylish and practical.',
            starCount :4,
            isConfirmed :false,
            createdAt: new Date(),
            userId :3,
            productId :5
          },
          {
            id:4,
            text: 'The TV stand is sturdy and easy to assemble.',
            starCount :2,
            isConfirmed :true,
            createdAt: new Date(),
            userId :1,
            productId :4
          },
          {
            id:5,
            text: 'It looks good, but the material isn’t as high quality as I expected.',
            starCount :5,
            isConfirmed :false,
            createdAt: new Date(),
            userId :2,
            productId :4
          },
          {
            id:6,
            text: 'The cushions on the chair are so soft and comfortable.',
            starCount :4,
            isConfirmed :true,
            createdAt: new Date(),
            userId :3,
            productId :4
          },
          {
            id:7,
            text: 'Decent quality, but a bit overpriced for what you get.',
            starCount :5,
            isConfirmed :true,
            createdAt: new Date(),
            userId :1,
            productId :4
          },
      );
  }
  getReviews(): Review[] {
    return this.reiew;
  }
}

