import { User } from "./user";

export class Role {
  id:number;
  name:string;
  color:string;
  createdAt: Date;
  users?: User[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.color = '';
    this.createdAt = new Date();
    this.users = [];
  }
}
export enum Roles {
  admin="admin",
  user="user",
};





