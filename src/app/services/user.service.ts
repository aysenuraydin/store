
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, pipe, catchError } from 'rxjs';
import { User } from '../models/user';
import { RoleService } from './role.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl:string = 'api/user';

  constructor(
    private http: HttpClient,
    private roleService: RoleService,
    private authService: AuthService
  ) {}


  getUsersWithRoleName(): Observable<(User & { roleName: string; roleColor: string })[]> {
    return forkJoin({
      users: this.http.get<User[]>(this.apiUrl),
      roles: this.roleService.getRoles()
    }).pipe(
      map(({ users, roles }) =>
        users
        .reverse()
        .map((user) => {
          const role = roles.find((role) => role.id === user.roleId);
          return {
            ...user,
            roleName: role?.name || '--',
            roleColor: role?.color || ''
          };
        })
      )
    );
  }
  searchUsers(query: string): Observable<(User & { roleName: string; roleColor: string })[]> {
    return this.getUsersWithRoleName().pipe(
      map(users =>
        users.filter(p => [p.name, p.surname, p.email, p.roleName, p.roleColor]
          .some(field => field.toLowerCase().includes(query.toLowerCase()))
        ) )
      );
  }
  getUserWithRoleName(id: number): Observable<User & { roleName: string; roleColor: string }> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      switchMap(user =>
        this.roleService.getRole(user.roleId).pipe(
          map(role => ({
            ...user,
            roleName: role?.name || '--',
            roleColor: role?.color || ''
          }))
        )
      )
    );
  }
  getUsers() :Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map( user =>user )
    );
  }
  getUser(id:number) : Observable<User>{
    return this.http.get<User>(this.apiUrl+'/'+id);
  }
  userLogin(email: string, password: string): Observable<User | null> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(i => i.email === email);
        if (user && user.password === password) {
          this.authService.login(user);
          return user
        } else {
          return null;
        }
      })
    );
  }

  getUserAccount(): Observable<User | null> {
    const currentUser = this.authService.getUser();
    if (!currentUser || !currentUser.id) return of(null);

    return this.getUser(currentUser.id).pipe(
      map(user => user),
      catchError(() => of(null))
    );
  }

  createUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.getUsers().pipe(
      map(users => {
        const lastId = users.length > 0 ? users.at(-1)?.id ?? 0 : 0;
        user.id = lastId + 1;
        return user;
      }),
      switchMap((c) => {
        return this.http.post<User>(this.apiUrl, c, httpOptions);
      })
    );
  }
  updateUser(user: User): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, user, httpOptions)
  }
  deleteUser(id: number): Observable<User>  {
    return this.http.delete<User>(this.apiUrl+'/'+id)
  }
}
