import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CategoryProductService } from '../../services/category-product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorValidators } from '../../Validators/color.validators';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styles: [``]
})
export class CategoriesComponent {

  categories: Category[] = [];
  buttonVisible:boolean = true;
  search:string = "";
  pageNumber:number = 1;
  pageSize:number = 9;
  pageTotal:number = 1;
  isSubmitted = false;

  categoryForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    color: new FormControl('', [Validators.required, ColorValidators.isValid]),
    iconCssClass: new FormControl(''),
    createdAt: new FormControl(new Date()),
    action: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService,
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
            this.categories = data.categories;
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
          this.categories = data.categories
          this.pageTotal = data.totalPages;
      }
    );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getCategories();
    else this.getQueryCategories();
  }
  editCategory(id: number): void {
    this.categoryService.getCategory(id)
    .subscribe(
      (data) => {
        this.categoryForm.patchValue({
          id:data.id,
          name: data.name,
          color: data.color,
          iconCssClass: data.iconCssClass,
          createdAt: data.createdAt
        });
      }
    );
    this.toggleWindow(true);
  }
  saveCategory():void{
    if (this.categoryForm.invalid) {
      this.isSubmitted = true;
      console.log("invalid")
      return;
    }
    switch(this.action){
      case 'add':
          this.createCategory()
          break;
      case 'edit':
        this.updateCategory()
            break;
      case 'delete':
          this.deleteCategory();
            break;
      default:
          break;
    }
  }
  createCategory(): void {
    console.log("create",this.categoryForm.value)
    this.categoryService.createCategory(this.categoryForm.value as Category).subscribe(() => {
      this.cancel()
      this.getCategories();
    });
  }
  updateCategory():void{
    this.categoryService.updateCategory(this.categoryForm.value as Category).subscribe(() => {
      this.cancel()
      this.getCategories();
    });
  }
  deleteCategory(): void {
    this.categoryService.deleteCategory(this.categoryForm.value.id??0).subscribe(()=>{
      this.cancel();
      this.getCategories();
    });
  }
  cancel():void{
    this.isSubmitted = false;
    this.categoryForm.reset({
      id: 0,
      name: '',
      color: '',
      iconCssClass: '',
      createdAt: new Date(),
      action: '',
    });
  }
  colorOpacity(hex: string) {
    return hex+'30';
  }
  setAction(action: string) {
    this.categoryForm.get('action')?.setValue(action);
  }
  get action() {
    return this.categoryForm.get('action')?.value;
  }
  get hasValidId() {
    const id = this.categoryForm.get('id')?.value;
    return Number(id) > 0;
  }
  get id() {
    return this.categoryForm.get('id');
  }
  get name() {
    return this.categoryForm.get('name');
  }
  get color() {
    return this.categoryForm.get('color');
  }
  get iconCssClass() {
    return this.categoryForm.get('iconCssClass');
  }
}
