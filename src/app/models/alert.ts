
export class Alert {
  id: number;
  userId: number;
  message: string;
  className: ClassName;
  color?: Color;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.message = "";
    this.className = ClassName.error;
  }
}
export enum ClassName {
  success="fa-check",
  warning="fa-exclamation",
  info="fa-circle-info",
  error="fa-xmark",
};
export enum Color{
  green="#43bc70",
  yellow="#eab308",
  blue="#3b82f6 ",
  red="#ef4444",
};
