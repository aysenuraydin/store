export class Category {
    id?:number;
    name: string;
    createdAt?: Date;
    color:string;
    iconCssClass?: string;

    constructor() {
      this.name = "";
      this.color = "";
      this.createdAt = new Date();
  }
}






