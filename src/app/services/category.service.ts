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
createCategory(subscribe: Category): Observable<Category> {
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  return this.getCategories().pipe(
    map(subscribes => {
      const lastId = subscribes.length > 0 ? subscribes.at(-1)?.id ?? 0 : 0;
      subscribe.id = lastId + 1;
      return subscribe;
    }),
    switchMap((c) => {
      return this.http.post<Category>(this.apiUrl, c, httpOptions);
    })
  );
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
updateCategory(subscribe: Category): Observable<any>  {
  const httpOptions= {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  return this.http.put(this.apiUrl, subscribe, httpOptions)
}
deleteCategory(id: number): Observable<Category>  {
  return this.http.delete<Category>(this.apiUrl+'/'+id)
}
}









