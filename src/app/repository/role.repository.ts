import { Role, Roles } from "../models/role";


export class RoleRepository {
  private roles: Role[];

  constructor() {
      this.roles = new Array<Role>(
          {
            id:1,
            name:Roles.admin,
            color:'#BE969B',
            createdAt: new Date(),
          },
          {
            id:2,
            name:Roles.user,
            color:'#828DE5',
            createdAt: new Date(),
          },
      );
  }
  getRoles(): Role[] {
    return this.roles;
  }
}



