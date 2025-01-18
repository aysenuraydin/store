import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, pipe, switchMap, tap } from 'rxjs';
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
    this.getCategories().subscribe(
      (categories) => {
        this.currentCategorySubject.next(categories);
      },
      (error) => {
        console.error('Kategori yüklenirken hata oluştu:', error);
      }
    );
  }

  getCategories(pageNumber: number = 1, pageSize: number = 3): Observable<Category[]> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    };

    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Kategori verisi alınırken hata oluştu:', error);
        throw error; // Hata geri fırlatılır
      })
    );
  }

  searchCategories(query: string): Observable<Category[]> {
    return this.getCategories().pipe(
      map((categories) =>
        categories.filter((category) =>
          [category.name, category.iconCssClass, category.color].some((field) =>
            field?.toLowerCase().includes(query.toLowerCase())
          )
        )
      )
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
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Category>(this.apiUrl, category, httpOptions).pipe(
      tap(() => this.loadCategories()),
      catchError((error) => {
        console.error('Kategori oluşturulurken hata oluştu:', error);
        throw error;
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
      tap(() => this.loadCategories()), // Kategori silindikten sonra listeyi günceller
      catchError((error) => {
        console.error(`Kategori ${id} silinirken hata oluştu:`, error);
        throw error;
      })
    );
  }
}









