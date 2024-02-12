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
    public vacationCountryISO: string;
    public vacationImageName: string;
    public vacationImageUrl: string;
    public vacationUploadedImage: UploadedFile;
    public vacationIsFollowing: number;
    public vacationFollowersCount: number;

    constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.vacationUUID = vacation.vacationUUID;
        this.vacationCountry = vacation.vacationCountry;
        this.vacationCity = vacation.vacationCity;
        this.vacationDescription = vacation.vacationDescription;
        this.vacationStartDate = vacation.vacationStartDate;
        this.vacationEndDate = vacation.vacationEndDate;
        this.vacationPrice = vacation.vacationPrice;
        this.vacationCountryISO = vacation.vacationCountryISO;
        this.vacationImageName = vacation.vacationImageName;
        this.vacationImageUrl = vacation.vacationImageUrl;
        this.vacationUploadedImage = vacation.vacationUploadedImage;
        this.vacationIsFollowing = vacation.vacationIsFollowing;
        this.vacationFollowersCount = vacation.vacationFollowersCount;
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
        vacationCountryISO: Joi.string().required().min(2).max(2),
        vacationImageName: Joi.string().forbidden(),
        vacationImageUrl: Joi.string().forbidden(),
        vacationUploadedImage: Joi.object().required(),
        vacationIsFollowing: Joi.number().forbidden(),
        vacationFollowersCount: Joi.number().forbidden()
    });

    public static editVacationValidationSchema = Joi.object({
        vacationId: Joi.number().optional(),
        vacationUUID: Joi.string().required().min(10).max(300),
        vacationCountry: Joi.string().required().min(2).max(100),
        vacationCity: Joi.string().required().min(2).max(100),
        vacationDescription: Joi.string().required().min(2).max(1000),
        vacationStartDate: Joi.date().required(),
        vacationEndDate: Joi.date().required(),
        vacationPrice: Joi.number().required().min(3).max(10000).integer().positive(),
        vacationCountryISO: Joi.string().required().min(2).max(2),
        vacationImageName: Joi.string().required().min(2).max(255),
        vacationImageUrl: Joi.string().optional().max(260),// should i check vacationimageurl? - make sure later
        vacationUploadedImage: Joi.object().optional(),
        vacationIsFollowing: Joi.number().forbidden(),
        vacationFollowersCount: Joi.number().forbidden()
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