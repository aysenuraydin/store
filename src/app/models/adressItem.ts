export class AdressItem {
  id:number;
  userId?: number;
  title: string;
  fullname: string;
  phone: number;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  isActive: boolean;
  createdAt?: Date;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.title = '';
    this.fullname = '';
    this.phone = 0;
    this.city = '';
    this.district = '';
    this.neighborhood = '';
    this.address = '';
    this.isActive = false;
    this.createdAt = new Date();
  }
}



