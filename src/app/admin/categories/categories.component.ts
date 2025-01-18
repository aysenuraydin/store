import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CategoryProductService } from '../../services/category-product.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styles: [``]
})
export class CategoriesComponent {
  category: Category = new Category();
  categories: Category[] = [];
  buttonVisible:boolean = true;
  search:string = "";
  constructor(
    private categoryService: CategoryService,
    private categoryProductService: CategoryProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  Search() {
    this.getQueryCategories();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryCategories();
  }
  Clear() {
    this.search = "";
    this.getCategories();
  }
  getQueryCategories(): void{
    this.categoryService.searchCategories(this.search)
        .subscribe(
          (data) => {
            this.categories = data;
        }
      );
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
        this.toggleWindow(true);
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
