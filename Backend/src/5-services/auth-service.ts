import { randomUUID } from 'crypto';
import { OkPacket } from 'mysql';
import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../3-models/credentials-model';
import { EmailTaken, Unauthorized } from '../3-models/error-models';
import RoleModel from '../3-models/role-model';
import UserModel from '../3-models/user-model';

class AuthService {
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
        const info: OkPacket = await dal.execute(sql, ['DEFAULT',
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

        credentials.password = cyber.hashPassword(credentials.password);

        const sql = `SELECT * FROM users WHERE userEmail = ? AND userPassword = ?`;
        const users = await dal.execute(sql, [credentials.email, credentials.password]);

        const user = users[0];

        if (!user) throw new Unauthorized("Incorrect email/password");

        delete user.userId;
        delete user.userPassword;

        const token = cyber.getNewToken(user);
        return token;
    }

    public async update(user: UserModel): Promise<string> {
        user.updateUserValidate();
        
        const isEmailTaken = await this.isEmailRegistered(user.userUUID, user.userEmail);
        if (isEmailTaken) throw new EmailTaken("Sorry but it seems like another user is registered with the same email🥴");

        const sql = `UPDATE users SET
                        userFirstName = ?,
                        userLastName = ?,
                        userEmail = ?
                    WHERE userUUID = ?`;
        const info: OkPacket = await dal.execute(sql, [
            user.userFirstName,
            user.userLastName,
            user.userEmail,
            user.userUUID,
        ]);

        const token = cyber.getNewToken(user);
        console.log(token);

        return token;
    }
}

const authService = new AuthService();
export default authService;