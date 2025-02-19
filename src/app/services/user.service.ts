
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, pipe, catchError, throwError } from 'rxjs';
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

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
  getAllUsersWithRoleName(): Observable<(User & { roleName: string; roleColor: string })[]> {
    return forkJoin({
      users: this.http.get<User[]>(this.apiUrl),
      roles: this.roleService.getAllRoles()
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
        }),
        catchError(this.handleError)
      )
    );
  }
  getUsersWithRoleName(pageNumber: number = 1, pageSize: number = 3): Observable<{ users: (User & { roleName: string; roleColor: string })[]; totalPages: number }> {
    return this.getAllUsersWithRoleName().pipe(
        map(users => {
            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedUsers = pageSize > 0 ? users.slice(startIndex, startIndex + pageSize) : users;
            const totalPages = Math.ceil(users.length / pageSize);

            return { users: paginatedUsers, totalPages };
        }),
        catchError(this.handleError)
    );
  }
  searchUsers(query: string, pageNumber: number = 1, pageSize: number = 3): Observable<{ users: (User & { roleName: string; roleColor: string })[]; totalPages: number }> {
    return this.getAllUsersWithRoleName().pipe(
        map(response => {
            const filteredUsers = response.filter(p =>
              [p.name, p.surname, p.email, p.roleName, p.roleColor]
                    .some(field => field?.toLowerCase().includes(query.toLowerCase()))
            );

            const startIndex = (pageNumber - 1) * pageSize;
            const paginatedUsers = pageSize > 0 ? filteredUsers.slice(startIndex, startIndex + pageSize) : filteredUsers;
            const totalPages = Math.ceil(filteredUsers.length / pageSize);

            return { users: paginatedUsers, totalPages };
        }),
        catchError(this.handleError)
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
          })),
          catchError(this.handleError)
        )
      )
    );
  }
  getUsersByRoleId(roleId:number) :Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map( user =>user.filter(r=> r.roleId==roleId)),
      catchError(this.handleError)
    );
  }
  getUsersLengthByRoleId(roleId: number): Observable<number> {
    return this.getUsersByRoleId(roleId).pipe(
      map(users => users.length),
      catchError(() => of(0))
    );
  }
  getUsers() :Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map( user =>user ),
      catchError(this.handleError)
    );
  }
  getUser(id:number) : Observable<User>{
    return this.http.get<User>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
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
      }),
      catchError(this.handleError)
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
      }),
      catchError(this.handleError)
    );
  }
  updateUser(user: User): Observable<any>  {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiUrl, user, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  deleteUser(id: number): Observable<User>  {
    return this.http.delete<User>(this.apiUrl+'/'+id).pipe(
      catchError(this.handleError)
    )
  }
}
