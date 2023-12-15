import Joi from "joi";
import RoleModel from "./role-model";

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
    private static validationSchema = Joi.object({

    })
}
export default UserModel;