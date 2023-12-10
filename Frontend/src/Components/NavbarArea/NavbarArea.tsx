import "./NavbarArea.css";
import site_logo from "../../Assets/Images/UtilityImages/vasilenko_vacations_logo.png"
import person_logo from "../../Assets/Images/UtilityImages/person_logo.png"
import { NavLink } from "react-router-dom";
function NavbarArea(): JSX.Element {
    return (
        <div className="NavbarArea">
            <div className="list-container">
                <ul>
                    <li><img src={site_logo} /></li>
                    <li>
                        <NavLink to={"#"}>
                            <img src={person_logo} className="person_logo"/>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default NavbarArea;
