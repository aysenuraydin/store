import { FavItem } from "../models/favItem";



export class FavItemRepository {
  private favs: FavItem[];

  constructor() {
    this.favs = [ ];
}
  getFavs(): FavItem[] {
    return this.favs;
  }
}



