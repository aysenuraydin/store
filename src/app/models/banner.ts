export class Banner {
    id:number;
    message: string;
    button: string;
    createdAt?: Date;
    isActive: boolean;

    constructor() {
      this.id = 0;
      this.message = '';
      this.button = '';
      this.createdAt = new Date();
      this.isActive = false;
  }
}






