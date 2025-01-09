import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryProductService } from '../../services/category-product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  product: Product = new Product();
  products: Product [] = [];
  productsWithCategoriesName: any [] = [];
  categories: Category [] = [];
  buttonVisible:boolean = true;

  constructor(
    private productService: ProductService,
    private categoryProductService: CategoryProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProductsWithCategoriesName();
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

  getProducts(): void{
    this.productService.getProducts()
        .subscribe(
          (data) => {
            this.products = data;
        }
      );
  }
  getProductsWithCategoriesName(){
    return this.categoryProductService.getProductsWithCategoryNames().subscribe(
      (data) => {
        this.productsWithCategoriesName = data.reverse().slice(0,10);
      }
    );
  }
  editProduct(id:number):void{
    this.productService.getProduct(id)
    .subscribe(
      (data) => {
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
      this.getProducts();
    });
  }
  updateProduct(product:Product):void{
    this.productService.updateProduct(product)
    .subscribe(() => {
      this.getProductsWithCategoriesName();
      this.getProducts();
    });
  }
  deleteProduct(id:number):void{
    this.productService.deleteProduct(id)
    .subscribe(() => {
      this.getProductsWithCategoriesName();
      this.getProducts();
    });
    this.cancel();
  }

  cancel():void{
    this.product = new Product();
  }
}
