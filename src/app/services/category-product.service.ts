import { forkJoin, map, Observable, of, switchMap } from "rxjs";
import { ProductService } from "./product.service";
import { CategoryService } from "./category.service";
import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { ExtendedProduct, Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  getProductsWithCategoryNames(): Observable<ExtendedProduct[]> {
    return this.productService.getProducts().pipe(
      switchMap(products => {
        const productObservables = products.map(product =>
          this.categoryService.getCategory(product.categoryId || 0).pipe(
            map(category => ({
              ...product,
              categoryName: category?.name || 'Unknown Category',
              categoryColor: category?.color || '#6d6d6d',
              categoryStyle: {
                'background-color': category?.color ? category.color + '30' : '#ccc',
                'color': category?.color ?? '#000',
                'border-color': category?.color ?? '#ccc',
                'border-width': '1px',
                'border-style': 'solid',
              }
            }))
          )
        );
        return productObservables.length > 0 ? forkJoin(productObservables) : of([]);
      })
    );
  }
  searchProducts(query: string): Observable<ExtendedProduct[]> {
    return this.getProductsWithCategoryNames().pipe(
      map(products =>
        products.filter(i =>
          [i.name, i.categoryColor, i.categoryName, i.description, i.details]
          .some(field => field.toLowerCase().includes(query.toLowerCase()))
        )
      )
    );
  }
  getProductWithCategoryName(id: number): Observable<any> {
    return this.productService.getProduct(id).pipe(
      switchMap(product =>
        this.categoryService.getCategory(product.categoryId || 0).pipe(
          map(category => ({
            ...product,
            categoryName: category?.name || 'Unknown Category',
            categoryColor: category?.color || '#6d6d6d',
            categoryStyle: {
              'background-color': category?.color ? category.color + '30' : '#ccc',
              'color': category?.color ?? '#000',
              'border-color': category?.color ?? '#ccc',
              'border-width': '1px',
              'border-style': 'solid',
            }
          }))
        )
      )
    );
  }
  getCategories(): Observable<Category[]>{
    return this.categoryService.getCategories();
  }
  getCategory(id: number): Observable<Category>{
    return this.categoryService.getCategory(id);
  }
  deleteCategory(id: number): Observable<Category> {
    if (id === 0) return new Observable<Category>();

    return this.productService.getProductsByCategoryId(id).pipe(
      switchMap((products) => {
        const updateObservables = products.map(product => {
          product.categoryId = 0;
          return this.productService.updateProduct(product);
        });
        return updateObservables.length > 0
          ? forkJoin(updateObservables).pipe(
              switchMap(() => this.categoryService.deleteCategory(id))
            )
          : this.categoryService.deleteCategory(id);
      })
    );
  }
}
