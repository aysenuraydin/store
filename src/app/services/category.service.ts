import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, pipe, switchMap, tap, throwError } from 'rxjs';
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
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  private loadCategories(): void {
    this.getAllCategories().subscribe({
        next: (b) => this.currentCategorySubject.next(b),
        error: (error) => console.error('Categories yüklenirken hata oluştu:', error),
      });
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
        catchError(error => {
            console.error('Error fetching categories', error);
            return of([]);
        }),
        catchError(this.handleError)
    );
}

getCategories(pageNumber: number = 1, pageSize: number = 3): Observable<{ categories: Category[]; totalPages: number }> {
  return this.getAllCategories().pipe(
      map(categories => {
          const startIndex = (pageNumber - 1) * pageSize;
          const paginatedCategories = pageSize > 0 ? categories.reverse().slice(startIndex, startIndex + pageSize) : categories;
          const totalPages = Math.ceil(categories.length / pageSize);

          return { categories: paginatedCategories, totalPages };
      }),
      catchError(this.handleError)
  );
}

searchCategories(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ categories: Category[]; totalPages: number }> {
  return this.getAllCategories().pipe(
      map(response => {
          const filteredCategories = response.filter(category =>
              [category.name, category.iconCssClass, category.color]
                  .some(field => field?.toLowerCase().includes(query.toLowerCase()))
          );

          const startIndex = (pageNumber - 1) * pageSize;
          const paginatedCategories = pageSize > 0 ? filteredCategories.reverse().slice(startIndex, startIndex + pageSize) : filteredCategories;
          const totalPages = Math.ceil(filteredCategories.length / pageSize);

          return { categories: paginatedCategories, totalPages };
      }),
      catchError(this.handleError)
  );4
}
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Kategori ${id} alınırken hata oluştu:`, error);
        throw error;
      }),
      catchError(this.handleError)
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
        }),
        catchError(this.handleError)
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









