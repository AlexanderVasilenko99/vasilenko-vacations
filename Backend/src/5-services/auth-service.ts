import { randomUUID } from 'crypto';
import { OkPacket } from 'mysql';
import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../3-models/credentials-model';
import { EmailTaken, ResourceNotFound, Unauthorized } from '../3-models/error-models';
import RoleModel from '../3-models/role-model';
import UserModel from '../3-models/user-model';
import { fileSaver } from 'uploaded-file-saver';
import appConfig from '../2-utils/app-config';

class AuthService {
    public async getExistingUserImageName(userUUID: string): Promise<string> {
        const sql = 'SELECT userImageName from users WHERE userUUID = ?'
        const info = await dal.execute(sql, [userUUID]);
        const imageName = info[0].userImageName;

        if (!imageName) return "";
        return imageName;
    }

    public async getExistingUserImagePath(userUUID: string): Promise<string> {
        const sql = 'SELECT userImageName from users WHERE userUUID = ?'
        const info: OkPacket = await dal.execute(sql, [userUUID]);
        const user = info[0];

        if (!user) return "";
        const existingImagePath = appConfig.appHost + "/api/image/" + user.userImageName;
        return existingImagePath;
    }

    private async isEmailTaken(email: string): Promise<boolean> {
        const sql = `SELECT
            userUUID,
            userFirstName,
            userLastName,
            userEmail
            FROM users
            WHERE userEmail = ?`
        const info: OkPacket = await dal.execute(sql, [email]);

        if (info[0]) return true;
        return false;
    }

    private async isEmailRegistered(uuid: string, email: string): Promise<boolean> {
        const sql = `SELECT
            userUUID,
            userFirstName,
            userLastName,
            userEmail
            FROM users
            WHERE userEmail = ? AND userUUID != ?`
        const info: OkPacket = await dal.execute(sql, [email, uuid]);

        if (info[0]) return true;
        return false;
    }

    public async register(user: UserModel): Promise<string> {
        user.addUserValidate();

        if (await this.isEmailTaken(user.userEmail))
            throw new EmailTaken("Sorry but it seems like this email is already being used!");

        user.userUUID = randomUUID();
        user.userRoleId = RoleModel.User;
        user.userPassword = cyber.hashPassword(user.userPassword);


        const sql = `INSERT INTO users VALUES(?,?,?,?,?,?,?)`;
        await dal.execute(sql, ['DEFAULT',
            user.userUUID,
            user.userFirstName,
            user.userLastName,
            user.userEmail,
            user.userPassword, user.userRoleId]);

        delete user.userId;
        delete user.userPassword;

        const token = cyber.getNewToken(user);
        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {
        credentials.validateCredentials();
        credentials.password = cyber.hashPassword(credentials.password);

        const sql = `SELECT * FROM users WHERE userEmail = ? AND userPassword = ?`;
        const users = await dal.execute(sql, [credentials.email, credentials.password]);

        const user = users[0];

        if (!user) throw new Unauthorized("Incorrect email/password");

        delete user.userId;
        delete user.userPassword;
        if (user.userImageName)
            user.userImageUrl = appConfig.appHost + "/api/users-image/" + user.userImageName;

        const token = cyber.getNewToken(user);
        return token;
    }

    public async update(user: UserModel): Promise<string> {
        user.updateUserValidate();

        let imageName: string;
        const existingImageName = await this.getExistingUserImageName(user.userUUID);

        if (existingImageName) imageName = existingImageName;

        if (existingImageName && user.userUploadedImage) {
            imageName = await fileSaver.update(existingImageName, user.userUploadedImage);
        }
        else if (existingImageName && !user.userUploadedImage) {
            imageName = existingImageName;
        }
        else if (!existingImageName && user.userUploadedImage) {
            imageName = await fileSaver.add(user.userUploadedImage);
        }

        const isEmailTaken = await this.isEmailRegistered(user.userUUID, user.userEmail);
        if (isEmailTaken) throw new EmailTaken("Sorry but it seems like another user is registered with the same email🥴");

        const sql = `UPDATE users SET
                        userFirstName = ?,
                        userLastName = ?,
                        userEmail = ?,
                        userImageName = ?
                    WHERE userUUID = ?`;
        const info: OkPacket = await dal.execute(sql, [
            user.userFirstName,
            user.userLastName,
            user.userEmail,
            imageName,
            user.userUUID
        ]);
        if (info.affectedRows === 0) throw new ResourceNotFound(user.userUUID);

        user.userImageUrl = appConfig.appHost + "/api/users-image/" + imageName;
        delete user.userUploadedImage;

        const token = cyber.getNewToken(user);
        return token;
    }
}
const authService = new AuthService();
export default authService;