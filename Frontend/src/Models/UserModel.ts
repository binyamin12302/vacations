import Role from "./RoleModel";

class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public roleId: Role;
}

export default UserModel;
