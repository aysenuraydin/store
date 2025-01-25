
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, pipe, throwError, catchError } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl:string = 'api/role';

  constructor(private http: HttpClient) {}
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  getAllRoles() :Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      map( role =>role),
       catchError(this.handleError)
    );
  }
  getRoles(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Role[]; totalPages: number }> {
    return this.getAllRoles().pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        }),
        catchError(this.handleError)
    );
  }

  searchRoles(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Role[]; totalPages: number }> {
    return this.getAllRoles().pipe(
        map(response => {
            const filteredProducts = response.filter(p =>
                    [p.color, p.name]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? filteredProducts.reverse().slice(startIndex, startIndex + pageSize) : filteredProducts;
            const totalPages = Math.ceil(filteredProducts.length / pageSize);

            return { products: paginatedProducts, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  getRole(id:number) : Observable<Role>{
    return this.http.get<Role>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
  createRole(role: Role): Observable<Role> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getAllRoles().pipe(
      map(roles => {
        const lastId = roles.length > 0 ? roles.at(-1)?.id ?? 0 : 0;
        role.id = lastId + 1;
        return role;
      }),
      switchMap((c) => {
        return this.http.post<Role>(this.apiUrl, c, httpOptions);
      }),
      catchError(this.handleError)
    );
  }
  updateRole(role: Role): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, role, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  deleteRole(id: number): Observable<Role>  {
    return this.http.delete<Role>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
}
