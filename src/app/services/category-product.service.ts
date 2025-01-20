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

  getProductsWithCategoryNames(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: ExtendedProduct[]; totalPages: number }> {
    return this.productService.getProducts().pipe(
      switchMap(products => {
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
        const totalPages = Math.ceil(products.length / pageSize);

        const productObservables = paginatedProducts.map(product =>
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

        return productObservables.length > 0
          ? forkJoin(productObservables).pipe(map(products => ({ products, totalPages })))
          : of({ products: [], totalPages });
      })
    );
  }
  getAllProductsWithCategoryNames(): Observable<ExtendedProduct[]> {
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

        return productObservables.length > 0
          ? forkJoin(productObservables).pipe()
          : of();
      })
    );
  }
  searchProducts(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: ExtendedProduct[]; totalPages: number }> {
    return this.getAllProductsWithCategoryNames().pipe(
      map(response => {
        const filteredProducts = response.filter(product =>
          [product.name, product.categoryColor, product.categoryName, product.description, product.details]
            .some(field => field?.toLowerCase().includes(query.toLowerCase()))
        )

        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
        const totalPages = Math.ceil(filteredProducts.length / pageSize);

        return { products: paginatedProducts, totalPages };
      })
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
    return this.categoryService.getAllCategories();
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
