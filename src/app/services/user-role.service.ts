import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
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



    getRoles3(pageNumber: number = 1, pageSize: number = 3):
    Observable<{ roles: (Role & { usersLength: number })[]; totalPages: number }> {
      return this.roleService.getAllRoles().pipe(
        map(roles => {
          console.log(roles[0])
          const rolesWithUserLength = roles.map(role => ({
            ...role,
            usersLength: role.users?.length || 0
          }));

          const startIndex = (pageNumber - 1) * pageSize;
          const paginatedRoles = pageSize > 0
            ? rolesWithUserLength.reverse().slice(startIndex, startIndex + pageSize)
            : rolesWithUserLength;

          const totalPages = Math.ceil(roles.length / pageSize);

          return { roles: paginatedRoles, totalPages };
        })
      );
    }
    searchRoles3(query: string, pageNumber: number = 1, pageSize: number = 3):
    Observable<{ roles: (Role & { usersLength: number })[]; totalPages: number }> {
        return this.roleService.getAllRoles().pipe(
            map(response => {
                const filteredRoles = response.filter(role =>
                    [role.color, role.name]
                        .some(field => field?.toLowerCase().includes(query.toLowerCase()))
                );
                const rolesWithUserLength = filteredRoles.map(role => ({
                    ...role,
                    usersLength: role.users?.length || 0
                }));
                const startIndex = (pageNumber - 1) * pageSize;
                const paginatedRoles = pageSize > 0
                    ? rolesWithUserLength.reverse().slice(startIndex, startIndex + pageSize)
                    : rolesWithUserLength;

                const totalPages = Math.ceil(rolesWithUserLength.length / pageSize);
                return { roles: paginatedRoles, totalPages };
            })
        );
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
            })
          );
        })
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
              }))
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
            })
          );
        })
      );
    }
}
