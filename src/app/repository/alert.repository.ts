import { Alert, ClassName, Color } from "../models/alert";

export class AlertRepository {
  private alerts: Alert[] = [];

  constructor() {
    this.alerts = [
      {
        id: 1,
        userId: 1,
        className: ClassName.error,
        message: "An unexpected error occurred while processing your request. Please try again.",
        color: Color.red
      },
      {
        id: 2,
        userId: 1,
        className: ClassName.info,
        message: "Your account settings have been updated successfully.",
        color: Color.blue
      },
      {
        id: 3,
        userId: 1,
        className: ClassName.warning,
        message: "Warning: Your subscription will expire in 5 days.",
        color: Color.yellow
      },
      {
        id: 4,
        userId: 1,
        className: ClassName.success,
        message: "Your transaction was successful. Thank you for your purchase.",
        color: Color.green
      },
      {
        id: 5,
        userId: 2,
        className: ClassName.info,
        message: "New features have been added to your dashboard. Check them out now!",
        color: Color.blue
      },
      {
        id: 6,
        userId: 3,
        className: ClassName.warning,
        message: "Your storage is almost full. Consider upgrading your plan.",
        color: Color.yellow
      },
      {
        id: 7,
        userId: 2,
        className: ClassName.error,
        message: "Unable to save your changes. Please try again later.",
        color: Color.red
      }
    ];
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }
}
