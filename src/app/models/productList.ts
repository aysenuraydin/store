export class ProductList {
    id:number;
    name: string;
    price: number;
    imgUrl: string;
    categoryId?: number;
    isFav?: boolean;

    //todo isconfirmedi stockAmount yoksa listelenmesin
    constructor() {
      this.id = 0;
      this.name = '';
      this.price = 0;
      this.categoryId = 0;
      this.isFav = false;
      this.imgUrl = 'https://via.placeholder.com/150';
  }
}










