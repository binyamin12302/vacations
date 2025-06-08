import express, { NextFunction, Request, Response } from "express";
import UserModel from "../4-models/user-model";
import logic from "../5-logic/auth-logic";
import CredentialsModel from "../4-models/credentials-model";
import cyber from "../2-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowModel from "../4-models/follow-model";
import dal from "../2-utils/dal";


const router = express.Router();

// POST http://localhost:3001/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
  try {

    const user = new UserModel(request.body);

    const token = await logic.register(user);

    response.status(201).json(token);

  } catch (error: any) {
    next(error)
  }

});


// POST http://localhost:3001/api/auth/login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
  try {
    
    const credentials = new CredentialsModel(request.body);


    const token = await logic.login(credentials);

    response.json(token);

    const dbName = await dal.execute("SELECT DATABASE() as db");
    response.json(dbName);

  } catch (error: any) {
    next(error)
  }


});


// POST http://localhost:3001/api/auth/follow
router.post("/auth/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

  try {
    let userId = cyber.getUserId(request)
     request.body.userId = userId 

    const followModel = new FollowModel(request.body)

    const followedVacation = await logic.followVacation(followModel);

    response.json(followedVacation);

  } catch (error: any) {
    next(error)
  }
});


// DELETE http://localhost:3001/api/auth/unfollow/:id
router.delete("/auth/unfollow/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

  try {
    const userId = cyber.getUserId(request)
    const vacationId = +request.params.id

    const followModel = new FollowModel({userId, vacationId})

    await logic.unfollowVacation(followModel);

    response.sendStatus(204);

  } catch (error: any) {
    next(error)
  }
});



export default router;