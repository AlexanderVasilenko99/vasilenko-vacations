import { useEffect } from "react";
import { authStore } from "../Redux/AuthState";
import noti from "../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function UseIsLoggedIn(shouldHeBe: boolean, errMsg: string, redirectInCaseOfError?: string) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = authStore.getState().token;
        if (shouldHeBe && !token) {
            noti.error(errMsg);
            navigate(redirectInCaseOfError ? redirectInCaseOfError : "/home");
            return;
        }
        else if (!shouldHeBe && token) {
            noti.error(errMsg);
            navigate(redirectInCaseOfError ? redirectInCaseOfError : "/home");
            return;
        }
        else if ((shouldHeBe && token) || (!shouldHeBe && !token)) {
            return;
        }

    }, []);
}
export default UseIsLoggedIn;