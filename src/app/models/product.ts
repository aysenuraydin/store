export class Product {
    id:number;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    categoryId?: number;
    isConfirmed?: boolean;
    createdAt?: Date;
    details:string;
    stockAmount?: number;
    // commentId?: number
    viewCount:number;

    constructor() {
      this.id = 0;
      this.name = '';
      this.price = 0;
      this.imgUrl = 'https://dummyimage.com/600x500/ccc/aaa';
      this.description = '';
      this.categoryId = 1;
      this.isConfirmed= true;
      this.createdAt = new Date();
      this.details='';
      this.stockAmount= 0;
      this.viewCount= 0;
  }
}

export class ExtendedProduct extends Product {
  categoryName: string = '';
  categoryColor: string = '';
  categoryStyle: {
    'background-color': string;
    'color': string;
    'border-color': string;
    'border-width': string;
    'border-style': string;
  } = {
    'background-color': '',
    'color': '',
    'border-color': '',
    'border-width': '1px',
    'border-style': 'solid'
  };
}








