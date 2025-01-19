import { Component } from '@angular/core';
import { Alert, Color, } from '../../models/alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) {  }

    ngOnInit(): void {
      this.alertService.alerts$.subscribe((alerts) => {
        this.alerts = alerts
      });
    }

    close(id:number){
      this.alertService.removeAlert(id);
    }

    lightenHexColor(hexColor: Color, percentage: number): string {
      const cleanHex = hexColor.replace("#", "");

      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);

      const newR = Math.min(255, Math.round(r + (255 - r) * (percentage / 100)));
      const newG = Math.min(255, Math.round(g + (255 - g) * (percentage / 100)));
      const newB = Math.min(255, Math.round(b + (255 - b) * (percentage / 100)));

      const lightenedColor =
        "#" +
        newR.toString(16).padStart(2, "0") +
        newG.toString(16).padStart(2, "0") +
        newB.toString(16).padStart(2, "0");

      return lightenedColor;
    }

  }








  // $('.alert-button').click(function(event) {
  //   $(this).closest('.alert').toggleClass('hidden').toggleClass('block');
  // });
