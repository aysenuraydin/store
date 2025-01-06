import { Injectable } from '@angular/core';
import { CategoryRepository } from '../repository/category.repository';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private dataSource: CategoryRepository;
    private categories: Category[];

    constructor() {
      this.dataSource = new CategoryRepository();
      this.categories = new Array<Category>();

      this.dataSource.getCategories().forEach(p => this.categories.push(p));
    }

    getCategories() :Category[] {
      return this.categories;
    }

      getCategory(id:number) :Category | undefined {
        return this.categories.find(i=>i.id==id);
      }

      createCategory(category: Category): void{
        category.id=(this.categories.at(-1)?.id?? 0) + 1;
        this.categories.push(category);
      }

      getCategoryNameById(id: number): string {
        const category = this.categories.find(cat => cat.id === id);
        return category?.name?? "" ;
      }
      getCategoryColorById(id: number): string {
        const category = this.categories.find(cat => cat.id === id);
        return category?.color?? '#6d6d6d' ;
      }

      updateCategory(category: Category): void {
        const index = this.categories.findIndex(p => p.id === category.id);
        if (index !== -1) {
          this.categories[index] = category;
        }
      }

      deleteCategory(id: number): void {
        const index = this.categories.findIndex(p => p.id === id);
        if (index !== -1) {
          this.categories.splice(index, 1);
        }
      }

}
