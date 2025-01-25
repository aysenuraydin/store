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
    try {
      const storedUser = localStorage.getItem('user');
      const user: User | null = storedUser ? JSON.parse(storedUser) : null;
      //!
      this.currentUserSubject = new BehaviorSubject<User | null>(user);
      this.currentUser$ = this.currentUserSubject.asObservable();
    } catch (error) {
      console.error('Kullanıcı verisi alınırken bir hata oluştu:', error);
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
      this.currentUser$ = this.currentUserSubject.asObservable();
    }
  }

  login(user: User): void {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Kullanıcı giriş işlemi sırasında bir hata oluştu:', error);
    }
  }

  logout(): void {
    try {
      localStorage.removeItem('user');
      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Kullanıcı çıkış işlemi sırasında bir hata oluştu:', error);
    }
  }

  isAuthenticated(): boolean {
    try {
      return this.currentUserSubject.value !== null;
    } catch (error) {
      console.error('Kullanıcı doğrulama kontrolü sırasında bir hata oluştu:', error);
      return false;
    }
  }

  getUser(): User | null {
    try {
      return this.currentUserSubject.value;
    } catch (error) {
      console.error('Kullanıcı bilgisi alınırken bir hata oluştu:', error);
      return null;
    }
  }
}
