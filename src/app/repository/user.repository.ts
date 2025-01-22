import { User } from "../models/user";


export class UserRepository {
  private users: User[];

  constructor() {
      this.users = new Array<User>(
          {
            id:1,
            name: 'admin',
            surname: 'admin',
            email: 'admin@admin.com',
            phone:5554443322,
            createdAt: new Date(),
            roleId :1,
            password :"1234"
          },
          {
            id:2,
            name: 'user 1',
            surname: 'user',
            email: 'user1@user.com',
            phone:5554443322,
            createdAt: new Date(),
            roleId :2,
            password :"1234"
          },
          {
            id:3,
            name: 'user 2',
            surname: 'user',
            email: 'user2@user.com',
            phone:5554443322,
            createdAt: new Date(),
            roleId :2,
            password :"1234"
          },
          {
            id:4,
            name: 'user 3',
            surname: 'user',
            email: 'user2@user.com',
            phone:5554443322,
            createdAt: new Date(),
            roleId :2,
            password :"1234"
          },
          {
            id:5,
            name: 'user 4',
            surname: 'user',
            email: 'user2@user.com',
            phone:5554443322,
            createdAt: new Date(),
            roleId :2,
            password :"1234"
          },
          {
            id:6,
            name: 'user 5',
            surname: 'user',
            email: 'user2@user.com',
            phone:5554443322,
            createdAt: new Date(),
            roleId :2,
            password :"1234"
          },
          {
            id:7,
            name: 'user 6',
            surname: 'user',
            email: 'user2@user.com',
            phone:5554443322,
            createdAt: new Date(),
            roleId :2,
            password :"1234"
          },
      );
  }
  getUsers(): User[] {
    return this.users;
  }
}


