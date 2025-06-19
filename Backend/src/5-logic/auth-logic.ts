import UserModel from "../4-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import {
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../4-models/errors-model";
import CredentialsModel from "../4-models/credentials-model";
import FollowModel from "../4-models/follow-model";
import Role from "../4-models/role-model";
import socketLogic from "./socket-logic";
import { OkPacket } from "mysql";
import { UserForToken } from "../4-models/types";

async function register(user: UserModel): Promise<string> {
  const errors = user.validatePost();

  if (errors) throw new ValidationError(errors);

  if (await isUsernameExist(user.username))
    throw new ValidationError(`username '${user.username}' exists`);

  user.password = cyber.hash(user.password);
  user.roleId = Role.User;

  const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?,?, ?,?)`;

  const values = [
    user.firstName,
    user.lastName,
    user.username,
    user.password,
    user.roleId,
  ];

  const info: OkPacket = await dal.execute(sql, values);

  user.userId = info.insertId;
  const userForToken: UserForToken = {
    userId: user.userId,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: Number(user.roleId),
  };
  const token = cyber.getNewToken(userForToken);
  return token;
}

async function isUsernameExist(username: string): Promise<boolean> {
  const sql = `SELECT EXISTS(SELECT * FROM users WHERE  username = ?) as isExists;`;

  const value = [username];

  const result = await dal.execute(sql, value);

  const isExists = result[0].isExists;

  return isExists === 1;
}

async function login(credentials: CredentialsModel): Promise<string> {
  const errors = credentials.validateCredentials();

  if (errors) throw new ValidationError(errors);

  credentials.password = cyber.hash(credentials.password);

  const sql = `SELECT * FROM users WHERE username = ? AND password = ? `;

  const values = [credentials.username, credentials.password];

  const users = await dal.execute(sql, values);

  if (!users[0]) throw new UnauthorizedError("Incorrect username or password");

  const user = users[0];
  const userForToken: UserForToken = {
    userId: user.userId,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.roleId,
  };
  const token = cyber.getNewToken(userForToken);
  return token;
}

async function followVacation(follow: FollowModel): Promise<void> {
  if (!(await isVacationExist(follow.vacationId)))
    throw new ValidationError(`The vacation doesn't exist`);

  const sql = `INSERT INTO followers (userId,vacationId) VALUES(${follow.userId}, ${follow.vacationId})`;

  await dal.execute(sql);

  socketLogic.reportFollowVacation(follow);
}

async function unfollowVacation(follow: FollowModel): Promise<void> {
  const sql = `DELETE FROM followers WHERE vacationId = ${follow.vacationId} and userId = ${follow.userId}`;

  const result = await dal.execute(sql);

  if (result.affectedRows === 0)
    throw new ResourceNotFoundError(follow.vacationId);

  socketLogic.reportUnfollowVacation(follow);
}

async function isVacationExist(vacationId: number): Promise<boolean> {
  const sql = `SELECT EXISTS(SELECT vacations.vacationId FROM vacations 
    WHERE vacationId = ${vacationId}) as isExists`;

  const result = await dal.execute(sql);
  const isExists = result[0].isExists;
  return isExists === 1;
}

export default {
  register,
  login,
  followVacation,
  unfollowVacation,
};
