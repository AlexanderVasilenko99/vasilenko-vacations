import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";

// 1. Class AuthState
// 2. Enum Action Types
// 3. Interface Action
// 4 Function Reducer
// 5 Create store

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
    Logout = "Logout"
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
            console.log(newState.user);
            
            newState.token = action.payload;
            sessionStorage.setItem(`token`, newState.token);
            break;

        case AuthActionTypes.Logout:
            console.log("logging out");
            newState.user = null;
            newState.token = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;
}
export const authStore = createStore(AuthReducer);