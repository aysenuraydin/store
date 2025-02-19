import { Category } from "../models/category";

export class CategoryRepository {
  private categories: Category[];

  constructor() {
      this.categories = new Array<Category>(
          { id: 0, name: '---', color: '#dddddd' },
          {
            id: 1,
            name: 'Mac',
            createdAt: new Date(),
            color: '#a4b2b0',
            iconCssClass: 'active'
          },
          {
            id: 2,
            name: 'iPad',
            createdAt: new Date(),
            color: '#896863'
          },
          {
            id: 3,
            name: 'iPhone',
            createdAt: new Date(),
            color: '#C27D42'
          },
          {
            id: 4,
            name: 'Watch',
            createdAt: new Date(),
            color: '#BE969B'
          },
          {
            id: 5,
            name: 'AirPods',
            createdAt: new Date(),
            color: '#828DE5'
          },
          {
            id: 6,
            name: 'Accessories',
            createdAt: new Date(),
            color: '#BF8882',
            iconCssClass: 'active'
          }
      );
  }

  getCategories(): Category[] {
    return this.categories;
  }
}
