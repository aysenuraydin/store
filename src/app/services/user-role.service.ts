import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { catchError, forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { RoleRepository } from '../repository/role.repository';
import { RoleService } from './role.service';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(
    private userService: UserService, private roleService: RoleService,
  ) { }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
    getRoles(pageNumber: number = 1, pageSize: number = 3):
    Observable<{ roles: (Role & { usersLength: number })[]; totalPages: number }> {
      return this.roleService.getAllRoles().pipe(
        switchMap(roles => {
          const rolesWithUserLength$ = roles.map(role =>
            this.userService.getUsersLengthByRoleId(role.id).pipe(
              map(usersLength => ({
                ...role,
                usersLength
              }))
            )
          );
          return forkJoin(rolesWithUserLength$).pipe(
            map(rolesWithUserLength => {
              const startIndex = (pageNumber - 1) * pageSize;
              const paginatedRoles = pageSize > 0
                ? rolesWithUserLength.reverse().slice(startIndex, startIndex + pageSize)
                : rolesWithUserLength;
              const totalPages = Math.ceil(roles.length / pageSize);
              return { roles: paginatedRoles, totalPages };
            }),
            catchError(this.handleError)
          );
        }),
        catchError(this.handleError)
      );
    }
  searchRoles(query: string, pageNumber: number = 1, pageSize: number = 3):
    Observable<{ roles: (Role & { usersLength: number })[]; totalPages: number }> {
      return this.roleService.getAllRoles().pipe(
        switchMap(roles => {
          const filteredRoles = roles.filter(role =>
            [role.color, role.name]
              .some(field => field?.toLowerCase().includes(query.toLowerCase()))
          );
          const rolesWithUserLength$ = filteredRoles.map(role =>
            this.userService.getUsersLengthByRoleId(role.id).pipe(
              map(usersLength => ({
                ...role,
                usersLength
              })),
              catchError(this.handleError)
            )
          );
          return forkJoin(rolesWithUserLength$).pipe(
            map(rolesWithUserLength => {
              const startIndex = (pageNumber - 1) * pageSize;
              const paginatedRoles = pageSize > 0
                ? rolesWithUserLength.reverse().slice(startIndex, startIndex + pageSize)
                : rolesWithUserLength;
              const totalPages = Math.ceil(rolesWithUserLength.length / pageSize);
              return { roles: paginatedRoles, totalPages };
            }),
            catchError(this.handleError)
          );
        })
      );
    }
}
