export class RecentlyItem {
    id:number;
    userId:number;
    name: string;
    price: number;
    imgUrl: string;

    //todo isconfirmedi stockAmount yoksa listelenmesin
    constructor() {
      this.id = 0;
      this.userId = 0;
      this.name = '';
      this.price = 0;
      this.imgUrl = 'https://dummyimage.com/600x500/ccc/aaa';
  }
}


export class Item {
  id:number;
  name: string;
  price: number;
  imgUrl: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.price = 0;
    this.imgUrl = 'https://dummyimage.com/600x500/ccc/aaa';
  }
}











