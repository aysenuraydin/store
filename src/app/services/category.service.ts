import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, pipe, switchMap, tap } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = 'api/category';

  private currentCategorySubject: BehaviorSubject<Category[]>;
  public currentCategory$: Observable<Category[]>;

  constructor(private http: HttpClient) {
    this.currentCategorySubject = new BehaviorSubject<Category[]>([]);
    this.currentCategory$ = this.currentCategorySubject.asObservable();

    this.loadCategories();
  }

  private loadCategories(): void {
    this.getAllCategories().subscribe(
      (categories) => {
        this.currentCategorySubject.next(categories);
      },
      (error) => {
        console.error('Kategori yüklenirken hata oluştu:', error);
      }
    );
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
        catchError(error => {
            console.error('Error fetching categories', error);
            return of([]);
        })
    );
}

getCategories(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Category[]; totalPages: number }> {
  return this.getAllCategories().pipe(
      map(products => {
          const startIndex = (pageNumber - 1) * pageSize;
          const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
          const totalPages = Math.ceil(products.length / pageSize);

          return { products: paginatedProducts, totalPages };
      })
  );
}

searchCategories(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Category[]; totalPages: number }> {
  return this.getAllCategories().pipe(
      map(response => {
          const filteredProducts = response.filter(category =>
              [category.name, category.iconCssClass, category.color]
                  .some(field => field?.toLowerCase().includes(query.toLowerCase()))
          );

          const startIndex = (pageNumber - 1) * pageSize;
          const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
          const totalPages = Math.ceil(filteredProducts.length / pageSize);

          return { products: paginatedProducts, totalPages };
      })
  );
}
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Kategori ${id} alınırken hata oluştu:`, error);
        throw error;
      })
    );
  }
  createCategory(category: Category): Observable<Category> {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.getAllCategories().pipe(
        map(c => {
          const lastId = c.length > 0 ? c.at(-1)?.id ?? 0 : 0;
          category.id = lastId + 1;
          return category;
        }),
        switchMap((c) => {
          return this.http.post<Category>(this.apiUrl, c, httpOptions).pipe(
            tap(() => this.loadCategories()),
            catchError((error) => {
              console.error('Kategori oluşturulurken hata oluştu:', error);
              throw error;
            })
          );
        })
      );
    }

  updateCategory(category: Category): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category, httpOptions).pipe(
      tap(() => this.loadCategories()),
      catchError((error) => {
        console.error('Kategori güncellenirken hata oluştu:', error);
        throw error;
      })
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadCategories()),
      catchError((error) => {
        console.error(`Kategori ${id} silinirken hata oluştu:`, error);
        throw error;
      })
    );
  }
}









