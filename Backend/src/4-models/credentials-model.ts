import Joi from "joi";
import { joiPassword } from "joi-password";

class CredentialsModel {

  public username: string;
  public password: string;

  public constructor(credentials: CredentialsModel) {
    this.username = credentials.username;
    this.password = credentials.password;
  }


  // POST Validation Schema:
  private static postCredentialsValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: joiPassword.string().required(),
  });

  public validateCredentials(): string {
    const result = CredentialsModel.postCredentialsValidationSchema.validate(this);
    return result.error?.message;
  }

}

export default CredentialsModel;