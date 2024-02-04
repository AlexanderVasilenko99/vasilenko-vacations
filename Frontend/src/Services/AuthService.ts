import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";
import { VacationsActionTypes, VacationsActions, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class AuthService {
    public async register(user: UserModel): Promise<void> {
        const response = await axios.post(appConfig.registerUrl, user);
        const token = response.data;

        const action: AuthAction = { type: AuthActionTypes.Register, payload: token }
        authStore.dispatch(action);
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials);
        const token = response.data;

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
        const options = { headers: { "Content-Type": "multipart/form-data" } }
        const response = await axios.put<UserModel>(appConfig.updateUrl, user, options);
        const token = response.data;

        const action: AuthAction = { type: AuthActionTypes.Update, payload: token }
        authStore.dispatch(action);

        return authStore.getState().user;
    }

}
const authService = new AuthService();
export default authService;