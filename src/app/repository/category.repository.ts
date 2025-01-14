import { Category } from "../models/category";

export class CategoryRepository {
  private categories: Category[];

  constructor() {
      this.categories = new Array<Category>(
          { id:0, name: '---', color:'#dddddd',},
          { id:1, name: 'Category1', createdAt: new Date(), color:'#a4b2b0', iconCssClass:'active'},
          { id:2, name: 'Category2', createdAt: new Date(), color:'#896863'},
          { id:3, name: 'Category3', createdAt: new Date(), color:'#C27D42'},
          { id:4, name: 'Category4', createdAt: new Date(), color:'#BE969B'},
          { id:5, name: 'Category5', createdAt: new Date(), color:'#828DE5'},
          { id:6, name: 'Category6', createdAt: new Date(), color:'#BF8882', iconCssClass:'active'},
          { id:7, name: 'Category7', createdAt: new Date(), color:'#595B56'},
          { id:8, name: 'Category8', createdAt: new Date(), color:'#DEBDB0', iconCssClass:'active'},
      );
  }
  getCategories(): Category[] {
    return this.categories;
  }
}
