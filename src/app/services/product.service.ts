
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductRepository } from '../repository/product.repository';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dataSource: ProductRepository;
  private products: Product[];

  constructor(private categoryService: CategoryService) {
    this.dataSource = new ProductRepository();
    this.products = new Array<Product>();

    this.dataSource.getProducts().forEach(p => this.products.push(p));
  }

  getProducts() :Product[] {
    return this.products;
  }
  getProduct(id:number) :Product | undefined {
    return this.products.find(i=>i.id==id);
  }

  getProductsWithCategoryNames() {
    return this.products.map(product => ({
      ...product,
      categoryName: this.categoryService.getCategoryNameById(product.categoryId || 0),
      categoryColor: this.categoryService.getCategoryColorById(product.categoryId || 0),
    }));
  }

  createProduct(product: Product): void{
    product.id=(this.products.at(-1)?.id?? 0) + 1;
    // product.createdAt= new Date();
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  deleteProduct(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

}

// <a class="btn btn-primary ml-2" [queryParams]="{page:1, order: 'newest'}" routerLink="/products">En Yeni Ürünler</a>
// <a [routerLink]="['/products',2]">detay</a>

