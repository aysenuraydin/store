import { Injectable } from '@angular/core';
import { Alert } from '../models/alert';
import { BehaviorSubject, throwError} from 'rxjs';
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
    },
    (error) => {
      console.error('Kullanıcı bilgisi alınırken bir hata oluştu:', error);
    });
  }
  filterAlertsForUser(userId: number): void {
    try {
      const filteredAlerts = this.alerts.filter(alert => alert.userId === userId);
      this.alertsSubject.next(filteredAlerts);
    } catch (error) {
      console.error('Uyarıları filtrelerken bir hata oluştu:', error);
    }
  }

  addAlert(alert: Alert): void {
    try {
      const currentUser = this.authService.getUser();
      if (currentUser) {
        alert.userId = currentUser.id;
      }
      const lastId = this.alerts.length > 0 ? this.alerts.at(-1)?.id ?? 0 : 0;
      alert.id = lastId + 1;

      setTimeout(() => {
        this.removeAlert(alert?.id??0);
      }, 5000);

      this.alerts.push(alert);
      this.alertsSubject.next(this.alerts);
    } catch (error) {
      console.error('Uyarı eklenirken bir hata oluştu:', error);
    }
  }

  removeAlert(id: number): void {
    try {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
      this.alertsSubject.next(this.alerts);
    } catch (error) {
      console.error('Uyarı kaldırılırken bir hata oluştu:', error);
    }
  }

  clearAlerts(): void {
    try {
      this.alerts = [];
      this.alertsSubject.next(this.alerts);
    } catch (error) {
      console.error('Uyarılar temizlenirken bir hata oluştu:', error);
    }
  }
}







