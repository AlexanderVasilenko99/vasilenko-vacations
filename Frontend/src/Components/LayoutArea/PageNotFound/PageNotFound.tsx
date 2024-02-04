import "./PageNotFound.css";
import UseTitle from "../../../Utils/UseTitle";
import backgroundImage from "../../../Assets/Images/UtilityImages/404.png"
import { NavLink } from "react-router-dom";
function PageNotFound(): JSX.Element {
    UseTitle("Vasilenko Vacations | 404");
    return (
        <div className="PageNotFound">
            <img src={backgroundImage} alt="" />
            <div>
                <p>Looks like you are looking for<br /> a page that doesn't exists!</p>
                <p>Maybe you would like to try our <NavLink to="/vacations">vacations</NavLink> page instead?</p>
            </div>
        </div >
    );
}

export default PageNotFound;