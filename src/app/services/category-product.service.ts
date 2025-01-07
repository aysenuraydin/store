import { forkJoin, map, Observable, of, switchMap } from "rxjs";
import { ProductService } from "./product.service";
import { CategoryService } from "./category.service";
import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  getProductsWithCategoryNames(): Observable<any[]> {
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

  getCategories(): Observable<Category[]>{
    return this.categoryService.getCategories();
  }
  getCategory(id: number): Observable<Category>{
    return this.categoryService.getCategory(id);
  }
}
