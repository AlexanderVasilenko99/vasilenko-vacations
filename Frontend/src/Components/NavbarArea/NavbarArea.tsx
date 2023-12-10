import "./NavbarArea.css";
import site_logo from "../../Assets/Images/UtilityImages/vasilenko_vacations_logo.png"
import person_logo from "../../Assets/Images/UtilityImages/person_logo.png"
import { NavLink } from "react-router-dom";
import appConfig from "../../Utils/AppConfig";
function NavbarArea(): JSX.Element {
    return (
        <div className="NavbarArea">
            <div className="list-container">
                <ul>
                    <li>
                        <NavLink to={appConfig.homeRoute}>
                            <img src={site_logo} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={appConfig.registerRoute}>
                            <img src={person_logo} className="person_logo" />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default NavbarArea;
