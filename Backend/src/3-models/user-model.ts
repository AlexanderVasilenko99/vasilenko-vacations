import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { Validation } from "./error-models";
import RoleModel from "./role-model";

class UserModel {
    public userId: number;
    public userUUID: string;
    public userFirstName: string;
    public userLastName: string;
    public userEmail: string;
    public userPassword: string;
    public userImageName: string;
    public userImageUrl: string;
    public userUploadedImage: UploadedFile;
    public userRoleId: RoleModel;

    constructor(user: UserModel) {
        this.userId = user.userId;
        this.userUUID = user.userUUID;
        this.userFirstName = user.userFirstName;
        this.userLastName = user.userLastName;
        this.userEmail = user.userEmail;
        this.userPassword = user.userPassword;
        this.userImageName = user.userImageName;
        this.userImageUrl = user.userImageUrl;
        this.userUploadedImage = user.userUploadedImage;
        this.userRoleId = user.userRoleId;
    }

    private static registerValidationSchema = Joi.object({
        userId: Joi.number().forbidden(),
        userUUID: Joi.string().forbidden(),
        userFirstName: Joi.string().required().min(2).max(30),
        userLastName: Joi.string().required().min(2).max(30),
        userEmail: Joi.string().required().min(2).max(50),
        userPassword: Joi.string().required().min(2).max(260),
        userImageName: Joi.forbidden(),
        userImageUrl: Joi.forbidden(),
        userUploadedImage: Joi.optional(),
        userRoleId: Joi.number().forbidden()
    });

    private static updateValidationSchema = Joi.object({
        userId: Joi.number().forbidden(),
        userUUID: Joi.string().required().min(2).max(300),
        userFirstName: Joi.string().required().min(2).max(30),
        userLastName: Joi.string().required().min(2).max(30),
        userEmail: Joi.string().required().min(2).max(50),
        userPassword: Joi.string().forbidden(),
        userImageName: Joi.string().optional().min(2).max(255),
        userImageUrl: Joi.string().optional().min(2).max(255),
        userUploadedImage: Joi.optional(),
        userRoleId: Joi.number().optional().min(1).max(5)
    });

    public addUserValidate(): void {
        const result = UserModel.registerValidationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
    }

    public updateUserValidate(): void {
        const result = UserModel.updateValidationSchema.validate(this);
        if (result?.error?.message) throw new Validation(result.error.message);
    }
}
export default UserModel;