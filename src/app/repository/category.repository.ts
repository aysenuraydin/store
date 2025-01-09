import { Category } from "../models/category";

export class CategoryRepository {
  private categories: Category[];

  constructor() {
      this.categories = new Array<Category>(
          { id:0, name: 'undefined', color:'#dddddd',},
          { id:1, name: 'Dress1', createdAt: new Date(), color:'#428be5', iconCssClass:'active'},
          { id:2, name: 'Dress2', createdAt: new Date(), color:'#b742e5'},
          { id:3, name: 'Dress3', createdAt: new Date(), color:'#5cc63b'},
          { id:4, name: 'Dress4', createdAt: new Date(), color:'#428be5'},
          { id:5, name: 'Dress5', createdAt: new Date(), color:'#5cc63b'},
          { id:6, name: 'Dress6', createdAt: new Date(), color:'#428be5', iconCssClass:'active'},
          { id:7, name: 'Dress7', createdAt: new Date(), color:'#b742e5'},
          { id:8, name: 'Dress8', createdAt: new Date(), color:'#428be5', iconCssClass:'active'},
      );
  }
  getCategories(): Category[] {
    return this.categories;
  }
}

