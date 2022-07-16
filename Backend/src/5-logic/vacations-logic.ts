import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import fs from "fs/promises";
import socketLogic from "./socket-logic";


// Get all vacations: 
async function getAllVacations(userId: number): Promise<VacationModel[]> {

  const sql = `SELECT 
              v.vacationId as id,v.destination, v.description, v.imageName,  v.startDate,
              v.endDate , v.price,
              (CASE WHEN followers.vacationId IS NULL THEN "Follow"  ELSE "Unfollow" END) as 'followState',
              (CASE WHEN f_v.followers IS NOT NULL THEN f_v.followers ELSE 0 END ) AS 'followers'
              FROM vacations v
              LEFT JOIN (SELECT followers.vacationId FROM followers WHERE followers.userId = ${userId}) 
              followers ON v.vacationId = followers.vacationId
              LEFT JOIN (SELECT  followers.vacationId, 
              COUNT(followers.vacationId) AS 'followers' FROM 
              followers GROUP BY followers.vacationId) AS f_v ON v.vacationId = f_v.vacationId`;

  const vacations = await dal.execute(sql);

  vacations.sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  vacations.sort((a: any, b: any) => b.followState.localeCompare("Unfollow"));

  return vacations;
}

// Add one vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

  const errors = vacation.validatePost();

  if (errors) throw new ValidationError(errors);


  if (vacation.image) {
    const dotIndex = vacation.image.name.lastIndexOf(".");
    const extension = vacation.image.name.substring(dotIndex);
    vacation.imageName = uuid() + extension;

    // Save in disk: 
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);

    // Don't return back image file: 
    delete vacation.image;
  }

  const sql = `INSERT INTO vacations (description,destination,imageName,startDate,endDate,price)
               VALUES(?,?,?,?,?,?)`;

  const values = [vacation.description, vacation.destination, vacation.imageName,
  vacation.startDate, vacation.endDate, vacation.price]

  const result: OkPacket = await dal.execute(sql, values);
  vacation.id = result.insertId;

  socketLogic.reportAddVacation(vacation);

  return vacation;
}



async function getPreviousImage(id: number): Promise<string> {
  const sql = `SELECT  imageName
    FROM vacations  WHERE vacationId = ${id}`
  const image = await dal.execute(sql);

  
  return image[0].imageName;
}


async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {

  // validate ----------- 
  const errors = vacation.validatePut();

  if (errors) {
    throw new ValidationError(errors);
  }



  const sql = `UPDATE vacations SET
              description = ?,
              destination = ?,
              imageName  = ?,
              startDate  = ?,
              endDate  = ?,
              price  = ? 
              WHERE vacationId = ?`


  const values = [vacation.description, vacation.destination, vacation.imageName, vacation.startDate,
  vacation.endDate, vacation.price, vacation.id]
  const result: OkPacket = await dal.execute(sql, values);



  socketLogic.reportUpdateVacation(vacation);

  if (result.affectedRows === 0) {
    throw new ResourceNotFoundError(vacation.id);
  }

  return vacation;
}


// Get one vacation: 
async function getOneVacation(id: number): Promise<VacationModel> {
  const sql = `SELECT vacationId AS id,  destination, description, imageName, startDate, endDate, price
              FROM vacations
              WHERE vacationId = ${id}`;
  const vacations = await dal.execute(sql);
  const vacation = vacations[0];
  if (!vacation) {
    throw new ResourceNotFoundError(id);
  }
  return vacation;
}


// Update partial vacation: 
async function updatePartialVacation(vacation: VacationModel): Promise<VacationModel> {

  const errors = vacation.validatePatch();
  if (errors) {
    throw new ValidationError(errors);
  }

  const previousImage = await getPreviousImage(vacation.id);

  const dbVacation = await getOneVacation(vacation.id);


  if (vacation.image) {

    const dotIndex = vacation.image.name.lastIndexOf(".");
    const extension = vacation.image.name.substring(dotIndex);
    vacation.imageName = uuid() + extension;


    // Save in disk: 
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);

    if (previousImage) {
      await fs.unlink('./src/1-assets/images/' + previousImage);
    }

    // Don't return back image file: 
    delete vacation.image;
  }

  for (const prop in dbVacation) {
    if (vacation[prop] !== undefined) {
      dbVacation[prop] = vacation[prop];
    }
  }



  const updatedProduct = await updateFullVacation(new VacationModel(dbVacation));
  return updatedProduct;
}


async function deleteVacation(id: number): Promise<void> {

  const previousImage = await getPreviousImage(id);


  const sql = `DELETE FROM vacations WHERE vacationId = ${id}`
  await dal.execute(sql);


  //Remove from disk
  await fs.unlink('./src/1-assets/images/' + previousImage);

  socketLogic.reportDeleteVacation(id);
}

export default {
  getAllVacations,
  addVacation,
  updateFullVacation,
  deleteVacation,
  updatePartialVacation
}

