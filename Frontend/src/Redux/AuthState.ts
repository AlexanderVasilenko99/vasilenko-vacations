import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

export class AuthState {
    public user: UserModel = null;
    public token: string = null;

    constructor() {
        this.token = sessionStorage.getItem("token");
        if (this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
        }
    }
}
export enum AuthActionTypes {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
    Update = "Update",
}
export interface AuthAction {
    type: AuthActionTypes,
    payload?: any
}
function AuthReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    let newState = { ...currentState };
    if (newState.token) {
        sessionStorage.setItem(`token`, newState.token);
    }

    switch (action.type) {
        case AuthActionTypes.Register:
        case AuthActionTypes.Login:
            newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
            newState.token = action.payload;
            sessionStorage.setItem(`token`, newState.token);
            break;

        case AuthActionTypes.Logout:
            newState.user = null;
            newState.token = null;
            sessionStorage.removeItem("token");
            break;
        case AuthActionTypes.Update:
            newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
            newState.token = action.payload;
            sessionStorage.setItem(`token`, newState.token);
            break;
    }
    console.log(newState);
    return newState;
}
export const authStore = createStore(AuthReducer);