export class RecentlyItem {
    id:number;
    // productId:number;
    userId:number;
    name: string;
    price: number;
    imgUrl: string;
    isFav?: boolean;

    //todo isconfirmedi stockAmount yoksa listelenmesin
    constructor() {
      this.id = 0;
      // this.productId = 0;
      this.userId = 0;
      this.name = '';
      this.price = 0;
      this.isFav = false;
      this.imgUrl = 'https://via.placeholder.com/150';
  }
}










