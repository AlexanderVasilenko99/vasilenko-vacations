import RoleModel from "./RoleModel";

class UserModel {
    public userId: number;
    public userUUID: string;
    public userFirstName: string;
    public userLastName: string;
    public userEmail: string;
    public userPassword: string;
    public userRoleId: RoleModel;
}
export default UserModel;
