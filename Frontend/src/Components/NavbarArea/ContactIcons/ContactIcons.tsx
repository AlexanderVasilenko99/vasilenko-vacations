import { NavLink } from "react-router-dom";
import emailIcon from "../../../Assets/Images/UtilityImages/emailicon.png";
import linkedinIcon from "../../../Assets/Images/UtilityImages/linkedinicon.png";
import phoneIcon from "../../../Assets/Images/UtilityImages/phoneicon.png";
import "./ContactIcons.css";

function ContactIcons(): JSX.Element {
    return (
        <div className="ContactIcons">
            <h3>Get In Touch!</h3>
            <div>
                <NavLink to='https://www.linkedin.com/in/alexander-vasilenko99/' target="_blank">
                    <img src={linkedinIcon} />
                </NavLink>
                <NavLink to='tel:0508145431' target="_blank">
                    <img src={phoneIcon} />
                </NavLink>
                <NavLink to='mailto:alexandervjr1@gmail.com' target="_blank">
                    <img src={emailIcon} />
                </NavLink>
            </div>
        </div>
    );
}

export default ContactIcons;
