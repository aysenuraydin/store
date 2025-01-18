
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

  getRoles() :Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      map( role =>role)
    );
  }
  searchRoles(query: string) :Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      map( role =>role.filter(p => [p.color, p.name]
        .some(field => field?.toLowerCase().includes(query.toLowerCase()))
      ) )
    );
  }
  getRole(id:number) : Observable<Role>{
    return this.http.get<Role>(this.apiUrl+'/'+id);
  }
  createRole(role: Role): Observable<Role> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getRoles().pipe(
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
