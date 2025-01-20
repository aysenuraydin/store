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
  pageNumber:number = 1;
  pageSize:number = 9;
  pageTotal:number = 1;
  constructor(
    private categoryService: CategoryService,
    private categoryProductService: CategoryProductService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  Search() {
    this.pageNumber=1;
    this.getQueryCategories();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.pageNumber=1;
    this.getQueryCategories();
  }
  Clear() {
    this.search = "";
    this.pageNumber=1;
    this.getCategories();
  }
  getQueryCategories(): void{
    this.categoryService.searchCategories(this.search,this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.categories = data.products;
            this.pageTotal = data.totalPages;
        }
      );
  }

  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  getCategories(): void{
    this.categoryService.getCategories(this.pageNumber, this.pageSize)
        .subscribe(
          (data) => {
            this.categories = data.products
            this.pageTotal = data.totalPages;
        }
      );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getCategories();
    else this.getQueryCategories();
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
