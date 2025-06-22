import Joi from "joi";
import { joiPassword } from "joi-password";
import Role from "./role-model";

class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public roleId: Role;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  private static postValidationSchema = Joi.object({
    userId: Joi.forbidden(),
    firstName: Joi.string()
      .required()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-zא-ת\s\-]+$/),
    lastName: Joi.string()
      .required()
      .min(2)
      .max(30)
      .pattern(/^[A-Za-zא-ת\s\-']+$/),
    username: Joi.string()
      .min(8)
      .max(30)
      .required()
      .pattern(/^[A-Za-zא-ת0-9_-]+$/),
    password: joiPassword
      .string()
      .min(8)
      .max(30)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .required(),
    roleId: Joi.forbidden(),
  });

  public validatePost(): string {
    const result = UserModel.postValidationSchema.validate(this);
    return result.error?.message;
  }

  public idUser(): number {
    return this.userId;
  }
}

export default UserModel;
