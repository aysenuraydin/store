export class AdressItem {
  id:number;
  userId?: number;
  title: string;
  fullname: string;
  email: string;
  phone: number;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  createdAt?: Date;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.title = '';
    this.fullname = '';
    this.email = '';
    this.phone = 0;
    this.city = '';
    this.district = '';
    this.neighborhood = '';
    this.address = '';
    this.createdAt = new Date();
  }
}



