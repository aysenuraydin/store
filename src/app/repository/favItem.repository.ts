import { FavItem } from "../models/favItem";



export class FavItemRepository {
  private favs: FavItem[];

  constructor() {
    this.favs = [
      // { id:1, productId:1,userId:1, name:"name1", price:10.50, imgUrl:'https://via.placeholder.com/150',isFav:false},
      // { id:2, productId:2,userId:2, name:"name2", price:20.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
      // { id:3, productId:3,userId:3, name:"name3", price:30.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
      // { id:4, productId:4,userId:4, name:"name4", price:40.50, imgUrl:'https://via.placeholder.com/150',isFav:false},
      // { id:5, productId:5,userId:5, name:"name5", price:50.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
      // { id:6, productId:6,userId:6, name:"name6", price:60.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
      // { id:7, productId:7,userId:7, name:"name7", price:70.50, imgUrl:'https://via.placeholder.com/150',isFav:false},
      // { id:8, productId:8,userId:8, name:"name8", price:80.50, imgUrl:'https://via.placeholder.com/150',isFav:true}
    ];
}
  getFavs(): FavItem[] {
    return this.favs;
  }
}



