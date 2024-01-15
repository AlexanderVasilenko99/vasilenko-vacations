import { NavLink } from "react-router-dom";
import "./Sponsor.css";
import SponsorModel from "../../../../Models/SponsorModel";

function Sponsor(sponsor: SponsorModel): JSX.Element {
    return (
        <NavLink to={sponsor.redirectTo} className="Sponsor" target="_blank">
            <img src={require(`../../../../Assets/Images/Sponsors/${sponsor.imageName}`)} />
        </NavLink>
    );
}

export default Sponsor;
