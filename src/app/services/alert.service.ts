import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertsSubject.asObservable();

  private alerts: Alert[] = [];

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.filterAlertsForUser(user.id);
      } else {
        this.clearAlerts();
      }
    });
  }

  filterAlertsForUser(userId: number): void {
    const filteredAlerts = this.alerts.filter(alert => alert.userId === userId);
    this.alertsSubject.next(filteredAlerts);
  }

  addAlert(alert: Alert): void {
    const currentUser = this.authService.getUser();
    if (currentUser) {
      alert.userId = currentUser.id;
    }
    const lastId = this.alerts.length > 0 ? this.alerts.at(-1)?.id ?? 0 : 0;
    alert.id = lastId + 1;

    setTimeout(() => {
      this.removeAlert(alert.id);
    }, 5000);

    this.alerts.push(alert);
    this.alertsSubject.next(this.alerts);
  }

  removeAlert(id: number): void {
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
    this.alertsSubject.next(this.alerts);
  }

  clearAlerts(): void {
    this.alerts = [];
    this.alertsSubject.next(this.alerts);
  }
}







