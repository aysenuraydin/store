
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, pipe } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl:string = 'api/role';

  constructor(private http: HttpClient) {}

  getAllRoles() :Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      map( role =>role)
    );
  }
  getRoles(pageNumber: number = 1, pageSize: number = 3): Observable<{ products: Role[]; totalPages: number }> {
    return this.getAllRoles().pipe(
        map(products => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedProducts = pageSize > 0 ? products.reverse().slice(startIndex, startIndex + pageSize) : products;
            const totalPages = Math.ceil(products.length / pageSize);

            return { products: paginatedProducts, totalPages };
        })
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
        })
    );
  }
  getRole(id:number) : Observable<Role>{
    return this.http.get<Role>(this.apiUrl+'/'+id);
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
      })
    );
  }
  updateRole(role: Role): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, role, httpOptions)
  }
  deleteRole(id: number): Observable<Role>  {
    return this.http.delete<Role>(this.apiUrl+'/'+id)
  }
}
