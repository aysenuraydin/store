
import { RecentlyItem} from "../models/recentlyItem";

export class recentlyItemRepository {
  private recentlies: RecentlyItem[];

  constructor() {
      this.recentlies = [
        { id:1, productId:1, name:"name1", price:10.50, imgUrl:'https://via.placeholder.com/150',isFav:false},
        { id:2, productId:2, name:"name2", price:20.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:3, productId:3, name:"name3", price:30.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:4, productId:4, name:"name4", price:40.50, imgUrl:'https://via.placeholder.com/150',isFav:false},
        { id:5, productId:5, name:"name5", price:50.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:6, productId:6, name:"name6", price:60.50, imgUrl:'https://via.placeholder.com/150',isFav:true},
        { id:7, productId:7, name:"name7", price:70.50, imgUrl:'https://via.placeholder.com/150',isFav:false},
        { id:8, productId:8, name:"name8", price:80.50, imgUrl:'https://via.placeholder.com/150',isFav:true}
      ];
  }
  getRecentlies(): RecentlyItem[] {
    return this.recentlies;
  }
}



