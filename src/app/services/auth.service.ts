import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor( ) {
    const storedUser = localStorage.getItem('user');
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;
    //!
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }
}

  // updateUser(user: User): void {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.currentUserSubject.next(user);
  // }
