import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";
import noti from "./NotificationService";
import { VacationsActionTypes, VacationsActions, vacationsStore } from "../Redux/VacationsState";

class AuthService {
    public async register(user: UserModel): Promise<boolean> {
        try {

            {/* ADD CHECK IF EMAIL IS ALREADY TAKEN! */ }

            const response = await axios.post(appConfig.registerUrl, user);
            if (response.status === 409) return false;

            const token = response.data;

            const action: AuthAction = { type: AuthActionTypes.Register, payload: token }
            authStore.dispatch(action);
            return true
        } catch (err: any) { noti.error(err) }

    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials);

        const token = response.data;
        console.log(token);

        const action: AuthAction = { type: AuthActionTypes.Login, payload: token }
        authStore.dispatch(action);
    }

    public logout(): void {
        const authAction: AuthAction = { type: AuthActionTypes.Logout }
        const vacationsAction: VacationsActions = { type: VacationsActionTypes.ClearAll }
        authStore.dispatch(authAction);
        vacationsStore.dispatch(vacationsAction);
    }

    public async update(user: UserModel): Promise<UserModel> {
        const response = await axios.put(appConfig.updateUrl, user);
        const token = response.data;

        const action: AuthAction = { type: AuthActionTypes.Update, payload: token }
        authStore.dispatch(action);

        return authStore.getState().user;
    }

}
const authService = new AuthService();
export default authService;