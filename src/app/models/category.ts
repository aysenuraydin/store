export class Category {
    id?:number;
    name?: string;
    createdAt?: Date;
    color?:string;
    iconCssClass?: string;

    constructor() {
      this.createdAt = new Date();
  }
}






