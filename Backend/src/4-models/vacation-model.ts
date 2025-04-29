import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {

  public id: number;
  public description: string;
  public destination: string;
  public imageName: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: UploadedFile;
  public followState: string;
  public followers: string;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.description = vacation.description;
    this.destination = vacation.destination;
    this.imageName = vacation?.imageName;
    this.image = vacation.image;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
  }

  // Validation Schemas:
  private static postValidationSchema = Joi.object({
    id: Joi.forbidden(),
    description: Joi.string().required().min(5).max(90),
    destination: Joi.string().required().min(2).max(30),
    imageName: Joi.string().min(10).max(255),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(100).max(10000),
    image: Joi.required()
  });

  private static putValidationSchema = Joi.object({
    id: Joi.number().required().integer().min(1),
    description: Joi.string().required().min(5).max(90),
    destination: Joi.string().required().min(2).max(30),
    imageName: Joi.string().min(10).max(255),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(100).max(10000),
    image: Joi.optional()
  });

  private static patchValidationSchema = Joi.object({
    id: Joi.number().required().integer().min(1),
    description: Joi.string().optional().min(5).max(90),
    destination: Joi.string().optional().min(2).max(30),
    imageName: Joi.string().min(10).max(255),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    price: Joi.number().optional().min(100).max(10000),
    image: Joi.optional()
  });

  // Validation Methods:
  public validatePost(): string {
    const result = VacationModel.postValidationSchema.validate(this);
    return result.error?.message;
  }

  public validatePut(): string {
    const result = VacationModel.putValidationSchema.validate(this);
    return result.error?.message;
  }

  public validatePatch(): string {
    const result = VacationModel.patchValidationSchema.validate(this);
    return result.error?.message;
  }
}

export default VacationModel;
