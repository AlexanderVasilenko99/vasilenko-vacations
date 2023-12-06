import Joi from "joi";
import { UploadedFile } from "express-fileupload"
import { Validation } from "./error-models";
class VacationModel {
    public vacationId: number;
    public vacationCountry: string;
    public vacationCity: string;
    public vacationDescription: string;
    public vacationStartDate: Date;
    public vacationEndDate: Date;
    public vacationPrice: number;
    public vacationImageName: string;
    public vacationUploadedImage: UploadedFile;
    constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.vacationCountry = vacation.vacationCountry;
        this.vacationCity = vacation.vacationCity;
        this.vacationDescription = vacation.vacationDescription;
        this.vacationStartDate = vacation.vacationStartDate;
        this.vacationEndDate = vacation.vacationEndDate;
        this.vacationPrice = vacation.vacationPrice;
        this.vacationImageName = vacation.vacationImageName;
        this.vacationUploadedImage = vacation.vacationUploadedImage;
    }
    public static addVacationValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden(),
        vacationCountry: Joi.string().required().min(2).max(100),
        vacationCity: Joi.string().required().min(2).max(100),
        vacationDescription: Joi.string().required().min(2).max(1000),
        vacationStartDate: Joi.date().required().greater('now'),
        vacationEndDate: Joi.date().required().greater('now'),
        vacationPrice: Joi.number().required().min(3).max(5).integer().positive(),
        vacationImageName: Joi.string().forbidden(),
        vacationUploadedImage: Joi.object().required()
    });
    public static editVacationValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().positive(),
        vacationCountry: Joi.string().required().min(2).max(100),
        vacationCity: Joi.string().required().min(2).max(100),
        vacationDescription: Joi.string().required().min(2).max(1000),
        vacationStartDate: Joi.date().required(),
        vacationEndDate: Joi.date().required(),
        vacationPrice: Joi.number().required().min(3).max(5).integer().positive(),
        vacationImageName: Joi.string().required().min(2).max(255),
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