import { authStore } from "../../../Redux/AuthState";
import UseIsLoggedIn from "../../../Utils/UseIsLoggedIn";
import UseTitle from "../../../Utils/UseTitle";
import Admin from "./Admin/Admin";
import User from "./User/User";
import "./VacationPage.css";

function VacationPage(): JSX.Element {
    UseTitle(`Vasilenko Vacations | Vacations`);
    UseIsLoggedIn(true, "You must be logged in to view our vacations!🥴");

    return (
        <div className="VacationPage">
            {authStore.getState().user?.userRoleId === 1 && <Admin />}
            {authStore.getState().user?.userRoleId === 2 && <User />}
        </div>
    );
}

export default VacationPage;
