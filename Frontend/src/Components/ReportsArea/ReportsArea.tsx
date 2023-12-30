import { useEffect } from "react";
import "./ReportsArea.css";
import UseTitle from "../../Utils/UseTitle";
import { authStore } from "../../Redux/AuthState";
import noti from "../../Services/NotificationService";
import { useNavigate } from "react-router-dom";

function ReportsArea(): JSX.Element {
    UseTitle("Vasilenko Vacations | Reports");
    const navigate = useNavigate();

    useEffect(() => {
        const token = authStore.getState().token;
        const roleId = authStore.getState().user?.userRoleId;
        if (!token || !roleId) {
            noti.error("Please login in to view this page");
            navigate("/login");
        }
        if (roleId === 2) {
            noti.error("You are unauthorized to view this page");
            navigate("/home");
        }
    }, []);

    return (
        <div className="ReportsArea">
            Reports Page
        </div>
    );
}

export default ReportsArea;
