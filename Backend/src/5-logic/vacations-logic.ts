import { uploadImage, deleteImage } from "./upload-logic";
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import socketLogic from "./socket-logic";

// Get all vacations:
async function getAllVacations(userId: number): Promise<VacationModel[]> {
  
  console.log("=== getAllVacations called! ===", userId);

  const sql = `SELECT 
              v.vacationId as id, v.destination, v.description, v.imageName, v.startDate,
              v.endDate, v.price,
              (CASE WHEN followers.vacationId IS NULL THEN 'Follow' ELSE 'Unfollow' END) AS followState,
              (CASE WHEN f_v.followers IS NOT NULL THEN f_v.followers ELSE 0 END) AS followers
              FROM vacations v
              LEFT JOIN (SELECT vacationId FROM followers WHERE userId = ${userId}) followers
              ON v.vacationId = followers.vacationId
              LEFT JOIN (
                SELECT vacationId, COUNT(vacationId) AS followers
                FROM followers
                GROUP BY vacationId
              ) AS f_v ON v.vacationId = f_v.vacationId`;

  const vacations = await dal.execute(sql);

  console.log(vacations, "vacations data");

  vacations.sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  vacations.sort((a: any, b: any) => b.followState.localeCompare("Unfollow"));

  return vacations;
}

// Add one vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  const errors = vacation.validatePost();
  if (errors) throw new ValidationError(errors);

  if (vacation.image) {
    const file = vacation.image;
    const filePath = file.tempFilePath;
    vacation.imageName = await uploadImage(filePath);
    delete vacation.image;
  }

  const sql = `INSERT INTO vacations (description, destination, imageName, startDate, endDate, price)
               VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    vacation.description,
    vacation.destination,
    vacation.imageName,
    vacation.startDate,
    vacation.endDate,
    vacation.price
  ];

  const result: OkPacket = await dal.execute(sql, values);
  vacation.id = result.insertId;

  socketLogic.reportAddVacation(vacation);

  return vacation;
}

// Get one vacation:
async function getOneVacation(id: number): Promise<VacationModel> {
  const sql = `SELECT vacationId AS id, destination, description, imageName, startDate, endDate, price
               FROM vacations WHERE vacationId = ${id}`;

  const vacations = await dal.execute(sql);
  const vacation = vacations[0];
  if (!vacation) throw new ResourceNotFoundError(id);

  return vacation;
}

async function getPreviousImage(id: number): Promise<string> {
  const sql = `SELECT imageName FROM vacations WHERE vacationId = ${id}`;
  const image = await dal.execute(sql);
  return image[0].imageName;
}

// Update full vacation:
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {
  const errors = vacation.validatePut();
  if (errors) throw new ValidationError(errors);

  if (vacation.image) {
    const file = vacation.image;
    const filePath = file.tempFilePath;
    vacation.imageName = await uploadImage(filePath);
    delete vacation.image;
  }

  const sql = `UPDATE vacations SET
              description = ?, destination = ?, imageName = ?, startDate = ?, endDate = ?, price = ?
              WHERE vacationId = ?`;

  const values = [
    vacation.description,
    vacation.destination,
    vacation.imageName,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.id
  ];

  const result: OkPacket = await dal.execute(sql, values);

  socketLogic.reportUpdateVacation(vacation);

  if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);

  return vacation;
}

// Update partial vacation:
async function updatePartialVacation(vacation: VacationModel): Promise<VacationModel> {
  const errors = vacation.validatePatch();
  if (errors) throw new ValidationError(errors);

  const previousVacation = await getOneVacation(vacation.id);

  if (vacation.image) {
    const file = vacation.image;
    const filePath = file.tempFilePath;

    if (previousVacation.imageName) {
      await deleteImage(previousVacation.imageName);
    }

    vacation.imageName = await uploadImage(filePath);
    delete vacation.image;
  } else {
    vacation.imageName = previousVacation.imageName;
  }

  const values = [];
  const fieldsToUpdate = [];

  const fields = ["description", "destination", "startDate", "endDate", "price", "imageName"];

  for (const field of fields) {
    if (vacation[field] !== undefined) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(vacation[field]);
    }
  }

  const sql = `UPDATE vacations SET ${fieldsToUpdate.join(", ")} WHERE vacationId = ?`;
  values.push(vacation.id);

  const result: OkPacket = await dal.execute(sql, values);
  if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);

  const updatedVacation = await getOneVacation(vacation.id);
  socketLogic.reportUpdateVacation(updatedVacation);

  return updatedVacation;
}

// Delete vacation:
async function deleteVacation(id: number): Promise<void> {
  const previousImage = await getPreviousImage(id);

  const sql = `DELETE FROM vacations WHERE vacationId = ${id}`;
  await dal.execute(sql);

  await deleteImage(previousImage);

  socketLogic.reportDeleteVacation(id);
}

export default {
  getAllVacations,
  addVacation,
  updateFullVacation,
  deleteVacation,
  updatePartialVacation
};
