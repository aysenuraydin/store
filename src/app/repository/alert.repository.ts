import { Alert, ClassName, Color } from "../models/alert";

export class AlertRepository {
  private alerts: Alert[] = [];

  constructor() {
    this.alerts = [
      {
        id:1,
        userId:1,
        className: ClassName.error,
        message:"Lorem ipsum dolor sit amet consectetur adipisicing elit.1",
        color: Color.red
      },
      {
        id:2,
        userId:1,
        className: ClassName.info,
        message:"Lorem ipsum dolor sit amet consectetur adipisicing elit.2",
        color: Color.blue
      },
      {
        id:3,
        userId:1,
        className: ClassName.warning,
        message:"Lorem ipsum dolor sit amet consectetur adipisicing elit.3",
        color: Color.yellow
      },
      {
        id:4,
        userId:1,
        className: ClassName.success,
        message:"Lorem ipsum dolor sit amet consectetur adipisicing elit.4",
        color: Color.green
      }
    ];
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }
}
