import { FavItem } from "../models/favItem";



export class FavItemRepository {
  private favs: FavItem[];

  constructor() {
      this.favs = [
        { id:2, productId:2, name:"name2", price:20.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:3, productId:3, name:"name3", price:30.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:5, productId:5, name:"name5", price:50.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:6, productId:6, name:"name6", price:60.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:7, productId:7, name:"name7", price:70.50, imgUrl:'https://via.placeholder.com/150',isFav:false},
        { id:8, productId:8, name:"name8", price:80.50, imgUrl:'https://via.placeholder.com/150',isFav:true}
      ];
  }
  getFavs(): FavItem[] {
    return this.favs;
  }
}



