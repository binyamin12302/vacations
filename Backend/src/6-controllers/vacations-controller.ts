import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cyber from "../2-utils/cyber";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { RouteNotFoundError } from "../4-models/errors-model";
import VacationModel from "../4-models/vacation-model";
import fs from "fs";
import logic from "../5-logic/vacations-logic";

const router = express.Router();

// GET http://localhost:3001/api/vacations
router.get("/vacations",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
  try {

    const getUserId = cyber.getUserId(request)

    console.log("=== getUserId ===", getUserId);

    console.log("=== getAllVacations v2.1 ===");


    const vacations = await logic.getAllVacations(getUserId);

    console.log("=== vacations ===", vacations);

    response.json(vacations);

  } catch (error: any) {
    next(error);
  }
});


// POST http://localhost:3001/api/vacations
router.post("/vacations",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {

  try {
    // Take image from request into the body: 
    request.body.image = request.files?.image;

    console.log(request.body.image);
    const vacation = new VacationModel(request.body);
    const addedVacation = await logic.addVacation(vacation);

    response.status(201).json(addedVacation);

  } catch (error: any) {
    next(error)
  }
});


// PATCH http://localhost:3001/api/vacations/7 <-- id
router.patch("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
  try {
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;
      const vacation = new VacationModel(request.body);
      const updateVacation = await logic.updatePartialVacation(vacation);
      response.json(updateVacation);
  }
  catch (err: any) {
      next(err);
  }
});


// PUT http://localhost:3001/api/vacations/:id
router.put("/vacations/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    request.body.id = +request.params.id;
    request.body.image = request.files?.image;
    const vacation = new VacationModel(request.body);

    const updateVacation = await logic.updateFullVacation(vacation);

    response.json(updateVacation);
  } catch (error: any) {
    next(error);
  };
});


// DELETE http://localhost:3001/api/vacations/:id
router.delete("/vacations/:id([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = +request.params.id;
    await logic.deleteVacation(id);

    response.sendStatus(204);
    
  } catch (error: any) {
    next(error)
  }
});

//GET http://localhost:3001/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
  try {
      
      const imageName = request.params.imageName;
      
      const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
      
      if(!fs.existsSync(absolutePath)) {
          throw new RouteNotFoundError(request.method, request.originalUrl);
      }
      
      response.sendFile(absolutePath);
  }
  catch (err: any) {
      next(err);
  }
});



export default router;