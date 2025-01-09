import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, pipe, switchMap } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class CategoryService {
  private apiUrl:string = 'api/category';

  constructor( private http: HttpClient) {  }

  getCategories(pageNumber: number = 1, pageSize: number = 3): Observable<Category[]> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };//! pagination için api lazım şu an yok
    // return this.http.get<Category[]>(this.apiUrl, { params }).pipe(
      return this.http.get<Category[]>(this.apiUrl).pipe(
        map(categories => categories)
      );
  }
  getCategory(id:number) : Observable<Category>{
    return this.http.get<Category>(this.apiUrl+'/'+id);
  }
  getCategoryNameById(id: number): Observable<string> {
    return this.getCategory(id).pipe(
      map(s => {
        return s?.color?? '#6d6d6d' ;
      })
    );
  }
  getCategoryColorById(id: number): Observable<string> {
    return this.getCategory(id).pipe(
      map(s => {
        return s?.color?? '#6d6d6d' ;
      })
    );
  }
  createCategory(category: Category): Observable<Category> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getCategories().pipe(
      map(c => {
        const lastId = c.length > 0 ? c.at(-1)?.id ?? 0 : 0;
        category.id = lastId + 1;
        return category;
      }),
      switchMap((c) => {
        return this.http.post<Category>(this.apiUrl, c, httpOptions);
      })
    );
  }
  updateCategory(category: Category): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, category, httpOptions)
  }
  deleteCategory(id: number): Observable<Category>  {
    return this.http.delete<Category>(this.apiUrl+'/'+id)
  }
}









