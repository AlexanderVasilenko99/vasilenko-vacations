import Joi from "joi";
import RoleModel from "./role-model";
import { Validation } from "./error-models";

class UserModel {
    public userId: number;
    public userUUID: string;
    public userFirstName: string;
    public userLastName: string;
    public userEmail: string;
    public userPassword: string;
    public userRoleId: RoleModel;

    constructor(user: UserModel) {
        this.userId = user.userId;
        this.userUUID = user.userUUID;
        this.userFirstName = user.userFirstName;
        this.userLastName = user.userLastName;
        this.userEmail = user.userEmail;
        this.userPassword = user.userPassword;
        this.userRoleId = user.userRoleId;
    }
    // add validation schema and validate function
    private static registerValidationSchema = Joi.object({
        userId: Joi.number().forbidden(),
        userUUID: Joi.string().forbidden(),
        userFirstName: Joi.string().required().min(2).max(30),
        userLastName: Joi.string().required().min(2).max(30),
        userEmail: Joi.string().required().min(2).max(50),
        userPassword: Joi.string().required().min(2).max(260),
        userRoleId: Joi.number().forbidden()
    })

    // public static addVacationValidationSchema = Joi.object({
    //     vacationPrice: Joi.number().required().min(3).max(10000).integer().positive(),
    //     vacationImageName: Joi.string().forbidden(),
    //     vacationImageUrl: Joi.string().forbidden(),
    //     vacationUploadedImage: Joi.object().required(),
    //     vacationIsFollowing: Joi.number().forbidden(),
    //     vacationFollowersCount: Joi.number().forbidden()
    // });

    public addUserValidate(): void {
        const result = UserModel.registerValidationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
    }
}
export default UserModel;