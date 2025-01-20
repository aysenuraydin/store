import { Component } from '@angular/core';
import { ExtendedProduct, Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryProductService } from '../../services/category-product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styles: [``]
})
export class ProductsComponent {
  product: ExtendedProduct = new ExtendedProduct();
  productsWithCategoriesName: ExtendedProduct [] = [];
  categories: Category [] = [];
  buttonVisible:boolean = true;
  search:string = "";
  pageNumber:number = 1;
  pageSize:number = 6;
  pageTotal:number = 1;

  constructor(
    private productService: ProductService,
    private categoryProductService: CategoryProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }
  Search() {
    this.pageNumber=1;
    this.getQueryProducts();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.pageNumber=1;
    this.getQueryProducts();
  }
  Clear() {
    this.search = "";
    this.pageNumber=1;
    this.getProducts();
  }
  toggleWindow(value:boolean) :void {
    this.buttonVisible = !value;
    this.cancel();
  }
  onDescriptionChange(updatedDescription: string): void {
    this.product.description = updatedDescription;
  }
  onDetailsChange(updatedDetails: string): void {
    this.product.details = updatedDetails;
  }
  colorOpacity(color?: string) {
    return color ? `${color}33` : 'transparent';
  }
  onCategoryChange(event: Event): void {
    const selectedCategoryId = +(event.target as HTMLSelectElement).value;
    const selectedCategory = this.categories.find(c => c.id === selectedCategoryId);
      if (this.product && selectedCategory?.color) {
        this.product.categoryColor = selectedCategory?.color;
      }
  }
  getCategories(): void{
    this.categoryProductService.getCategories()
        .subscribe(
          (data) => {
            this.categories = data;
        }
      );
  }
  getCategoryName(id: number): void {
    this.categoryProductService.getCategory(id).subscribe()
  }
  getProducts(){
    return this.categoryProductService
    .getProductsWithCategoryNames(this.pageNumber,this.pageSize)
    .subscribe(
      (data) => {
        this.productsWithCategoriesName = data.products;
        this.pageTotal = data.totalPages;
      }
    );
  }
  getQueryProducts(): void{
    this.categoryProductService.searchProducts(this.search,this.pageNumber,this.pageSize)
        .subscribe(
          (data) => {
            this.productsWithCategoriesName = data.products;
            this.pageTotal = data.totalPages;
        }
      );
  }
  getPageNumber(pageNumber:number){
    this.pageNumber = pageNumber
    if(this.search.length==0) this.getProducts();
    else this.getQueryProducts();
  }
  editProduct(id:number):void{
    this.categoryProductService.getProductWithCategoryName(id)
    .subscribe(
      (data) => {
        this.toggleWindow(true);
        this.product = data;
      }
    );
  }
  saveProduct(product:Product):void{
    product.id
      ? this.updateProduct(product)
      : this.createProduct(product);
      this.cancel();
  }
  createProduct(product: Product): void {
    this.productService.createProduct(product)
    .subscribe(() => {
      this.getProducts();
    });
  }
  updateProduct(product:Product):void{
    this.productService.updateProduct(product)
    .subscribe(() => {
      this.getProducts();
    });
  }
  deleteProduct(id:number):void{
    this.productService.deleteProduct(id)
    .subscribe(() => {
      this.getProducts();
    });
    this.cancel();
  }
  cancel():void{
    this.product = new ExtendedProduct();
  }
}


