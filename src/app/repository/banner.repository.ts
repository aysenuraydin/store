import { Banner } from "../models/banner";

export class BannerRepository {
  private banners: Banner[];

  constructor() {
      this.banners = new Array<Banner>(
          { id:1, message: 'GeneriCon 2023 Join us in Denver from June 7 - 9 to see what’s coming next. ', createdAt: new Date(), button :'Register now 1', isActive :true},
          { id:2, message: 'GeneriCon 2023Join us in Denver from June 7 - 9.', createdAt: new Date(), button :'Register now 2', isActive :false},
          { id:3, message: 'GeneriCon 2023Join us in Denver from June 7 - 9.', createdAt: new Date(), button :'Register now 3', isActive :false},
          { id:4, message: 'GeneriCon 2023Join us in Denver from June 7 - 9.', createdAt: new Date(), button :'Register now 4', isActive :false},
          { id:5, message: 'GeneriCon 2023Join us in Denver from June 7 - 9.', createdAt: new Date(), button :'Register now 5', isActive :false},
      );
  }
  getBanners(): Banner[] {
    return this.banners;
  }
}


