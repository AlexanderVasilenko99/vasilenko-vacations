import { useEffect } from "react";
import { authStore } from "../Redux/AuthState";
import noti from "../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function UseIsLoggedIn(errMsg:string) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = authStore.getState().token;
        if (token) {
            noti.error(errMsg);
            navigate("/home");
            return;
        }
    }, []);
}
export default UseIsLoggedIn;