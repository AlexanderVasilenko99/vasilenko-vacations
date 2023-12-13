import Joi from "joi";
import { UploadedFile } from "express-fileupload"
import { Validation } from "./error-models";
class VacationModel {
    public vacationId: number;
    public vacationUUID: string;
    public vacationCountry: string;
    public vacationCity: string;
    public vacationDescription: string;
    public vacationStartDate: Date;
    public vacationEndDate: Date;
    public vacationPrice: number;
    public vacationImageName: string;
    public vacationImageUrl: string;
    public vacationUploadedImage: UploadedFile;
    constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.vacationUUID = vacation.vacationUUID;
        this.vacationCountry = vacation.vacationCountry;
        this.vacationCity = vacation.vacationCity;
        this.vacationDescription = vacation.vacationDescription;
        this.vacationStartDate = vacation.vacationStartDate;
        this.vacationEndDate = vacation.vacationEndDate;
        this.vacationPrice = vacation.vacationPrice;
        this.vacationImageName = vacation.vacationImageName;
        this.vacationImageUrl = vacation.vacationImageUrl;
        this.vacationUploadedImage = vacation.vacationUploadedImage;
    }
    public static addVacationValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden(),
        vacationUUID: Joi.string().forbidden(),
        vacationCountry: Joi.string().required().min(2).max(100),
        vacationCity: Joi.string().required().min(2).max(100),
        vacationDescription: Joi.string().required().min(2).max(1000),
        vacationStartDate: Joi.date().required().greater('now'),
        vacationEndDate: Joi.date().required().greater('now'),
        vacationPrice: Joi.number().required().min(3).max(10000).integer().positive(),
        vacationImageName: Joi.string().forbidden(),
        vacationImageUrl: Joi.string().forbidden(),
        vacationUploadedImage: Joi.object().required()
    });
    public static editVacationValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().positive(),
        vacationUUID: Joi.string().required().min(10).max(300),
        vacationCountry: Joi.string().required().min(2).max(100),
        vacationCity: Joi.string().required().min(2).max(100),
        vacationDescription: Joi.string().required().min(2).max(1000),
        vacationStartDate: Joi.date().required(),
        vacationEndDate: Joi.date().required(),
        vacationPrice: Joi.number().required().min(3).max(10000).integer().positive(),
        vacationImageName: Joi.string().required().min(2).max(255),
        vacationImageUrl: Joi.string().optional().max(260),// should i check vacationimageurl? - make sure later
        vacationUploadedImage: Joi.object().optional()
    });
    public addVacationValidate(): void {
        const result = VacationModel.addVacationValidationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
    }
    public editVacationValidate(): void {
        const result = VacationModel.editVacationValidationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
    }
}
export default VacationModel;