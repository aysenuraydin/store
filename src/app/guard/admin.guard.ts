import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      map(user => {
        const isAdmin = !!user && user.roleId == 1;
        if (!isAdmin) {
          return this.router.createUrlTree(['/not-found']);
        }
        return true;
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/not-found']));
      })
    );
  }
}
