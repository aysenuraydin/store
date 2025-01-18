export class Subscribe {
    id?:number;
    email: string;
    createdAt?: Date;
    isActive: Boolean;

    constructor() {
      this.id = 0;
      this.email = '';
      this.createdAt = new Date();
      this.isActive = false;
  }
}






