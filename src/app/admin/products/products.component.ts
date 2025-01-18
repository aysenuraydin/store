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

  constructor(
    private productService: ProductService,
    private categoryProductService: CategoryProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProductsWithCategoriesName();
  }
  Search() {
    this.getQueryProducts();
  }
  onInputChange(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.getQueryProducts();
  }
  Clear() {
    this.search = "";
    this.getProductsWithCategoriesName();
  }
  getQueryProducts(): void{
    this.categoryProductService.searchProducts(this.search)
        .subscribe(
          (data) => {
            this.productsWithCategoriesName = data;
        }
      );
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

  getProductsWithCategoriesName(){
    return this.categoryProductService.getProductsWithCategoryNames().subscribe(
      (data) => {
        this.productsWithCategoriesName = data.reverse().slice(0,10);
      }
    );
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
      this.getProductsWithCategoriesName();
    });
  }
  updateProduct(product:Product):void{
    this.productService.updateProduct(product)
    .subscribe(() => {
      this.getProductsWithCategoriesName();
    });
  }
  deleteProduct(id:number):void{
    this.productService.deleteProduct(id)
    .subscribe(() => {
      this.getProductsWithCategoriesName();
    });
    this.cancel();
  }

  cancel():void{
    this.product = new ExtendedProduct();
  }
}


