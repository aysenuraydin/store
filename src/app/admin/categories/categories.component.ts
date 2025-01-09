import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CategoryProductService } from '../../services/category-product.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  category: Category = new Category();
  categories: Category[] = [];
  buttonVisible:boolean = true;

  constructor(
    private categoryService: CategoryService,
    private categoryProductService: CategoryProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getCategories(): void{
    this.categoryService.getCategories()
        .subscribe(
          (data) => {
            this.categories = data.reverse().slice(0,10);
        }
      );
  }
  editCategory(id:number):void{
    this.categoryService.getCategory(id)
    .subscribe(
      (data) => {
        this.category = data;
      }
    );
  }
  saveCategory(category:Category):void{
    category.id
      ? this.updateCategory(category)
      : this.createCategory(category);

      this.cancel();
  }
  createCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe(() => {
      this.getCategories();
    });
  }
  updateCategory(category:Category):void{
    this.categoryService.updateCategory(category).subscribe(() => {
      this.getCategories();
    });
  }
  deleteCategory(id:number):void{
    this.categoryProductService.deleteCategory(id).subscribe(() => {
      this.getCategories();
      this.cancel();
    });
  }
  cancel():void{
    this.category = new Category();
  }
  colorOpacity(hex: string) {
    return hex+'30';
  }
}
