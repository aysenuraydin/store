import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  category: Category = new Category();
  class:string ="";

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  getCategories(): Category[] {
    return this.categoryService.getCategories().reverse().slice(0,8);
  }
  saveCategory(category:Category):void{
    category.id
      ? this.categoryService.updateCategory(category)
      : this.categoryService.createCategory(category);

      this.cancel();
  }
  deleteCategory(id:number):void{
    this.categoryService.deleteCategory(id);
    this.cancel();
  }
  editCategory(id:number):void{
    this.category = this.categoryService.getCategory(id)?? new Category();
  }
  cancel():void{
    this.category = new Category();

  }
  colorOpacity(hex: string) {
    return hex+'30';
  }
}
