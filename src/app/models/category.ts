export class Category {
    id?:number;
    name: string;
    createdAt?: Date;
    color:string;
    iconCssClass?: string;

    constructor() {
      this.name = "";
      this.color = "";
      this.iconCssClass = "";
      this.createdAt = new Date();
  }
}






