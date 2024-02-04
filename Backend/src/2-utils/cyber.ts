import { Forbidden, Unauthorized } from "../3-models/error-models";
import UserModel from "../3-models/user-model";
import jwt from "jsonwebtoken"
import RoleModel from "../3-models/role-model";
import crypto from "crypto"

class Cyber {
    private secretKey = "myverysecretsecretkey"
    public hashPassword(plainText: string): string {
        if (!plainText) return null;
        const salt = "this_is_my_salt";
        const hashPassword = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
        return hashPassword;
    }

    public getNewToken(user: UserModel): string {
        const container = { user };
        const options = { expiresIn: "3h" };
        const token = jwt.sign(container, this.secretKey, options)

        delete user.userPassword;
        return token;
    }

    public verifyToken(token: string): void {
        if (!token) throw new Unauthorized("You are not logged in!");
        try {
            jwt.verify(token, this.secretKey);
        } catch (err: any) {
            throw new Unauthorized(err.message);
        }
    }

    public verifyAdmin(token: string): void {
        this.verifyToken(token);
        const container = jwt.verify(token, this.secretKey) as { user: UserModel };
        const user = container.user;
        if (user.userRoleId !== RoleModel.Admin) throw new Forbidden("You are not administrator")
    }
}
const cyber = new Cyber();
export default cyber;