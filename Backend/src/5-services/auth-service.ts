// class AuthService{
//     public register(){

//     }
// }
// const authService = new AuthService();
// export default authService;
import { OkPacket } from 'mysql';
import cyber from '../2-utils/cyber';
import dal from '../2-utils/dal';
import CredentialsModel from '../3-models/credentials-model';
import { EmailTaken, Unauthorized } from '../3-models/error-models';
import RoleModel from '../3-models/role-model';
import UserModel from '../3-models/user-model';
import { randomUUID } from 'crypto';
class AuthService {
    private async isEmailTaken(email: string): Promise<boolean> {
        const sql = "SELECT userUUID,userFirstName,userLastName,userEmail FROM users WHERE userEmail = ?"
        const info: OkPacket = await dal.execute(sql, [email]);

        if (info[0]) return true;
        return false;
    }

    public async register(user: UserModel): Promise<string> {

        user.addUserValidate();

        if (await this.isEmailTaken(user.userEmail)) throw new EmailTaken("This email is taken!");

        user.userRoleId = RoleModel.User;
        user.userUUID = randomUUID();

        user.userPassword = cyber.hashPassword(user.userPassword);

        const sql = `INSERT INTO users VALUES(?,?,?,?,?,?,?)`;

        const info: OkPacket = await dal.execute(sql, ['DEFAULT',
            user.userUUID,
            user.userFirstName,
            user.userLastName,
            user.userEmail,
            user.userPassword, user.userRoleId]);

        delete user.userPassword;
        delete user.userId;

        const token = cyber.getNewToken(user);

        return token;
    }
    public async login(credentials: CredentialsModel): Promise<string> {
        // Validate:
        // User.validate from model:

        // hash password
        credentials.password = cyber.hashPassword(credentials.password);

        // Create sql:
        const sql = `SELECT * FROM users WHERE userEmail = ? AND userPassword = ?`;


        const users = await dal.execute(sql, [credentials.email, credentials.password]);

        // getSingleUser
        const user = users[0];

        if (!user) throw new Unauthorized("Incorrect email/password");

        delete user.userPassword;
        delete user.userId;

        // Create token for user:
        const token = cyber.getNewToken(user);

        return token;
    }
}

const authService = new AuthService();
export default authService;