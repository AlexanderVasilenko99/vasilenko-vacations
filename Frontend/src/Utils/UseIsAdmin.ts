import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import noti from "../Services/NotificationService";

function UseIsAdmin(shouldHeBe: boolean, errMsg: string, redirectInCaseOfError?: string) {
    const navigate = useNavigate();
    useEffect(() => {
        const state = authStore.getState();
        const token = state.token;
        const roleId = state.user?.userRoleId;

        if (!token) {
            noti.error(errMsg);
            navigate(redirectInCaseOfError ? redirectInCaseOfError : "/home");
            return;
        };
        if (shouldHeBe && roleId !== 1) {
            noti.error(errMsg);
            navigate(redirectInCaseOfError ? redirectInCaseOfError : "/home");
            return;
        }
        else if (!shouldHeBe && roleId === 1) {
            noti.error(errMsg);
            navigate(redirectInCaseOfError ? redirectInCaseOfError : "/home");
            return;
        }
        else if ((shouldHeBe && roleId === 1) || (!shouldHeBe && roleId === 2)) {
            return;
        }

    }, []);
}
export default UseIsAdmin;