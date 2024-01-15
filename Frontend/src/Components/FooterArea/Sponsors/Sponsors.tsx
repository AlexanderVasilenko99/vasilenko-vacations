import SponsorModel from "../../../Models/SponsorModel";
import Sponsor from "./Sponsor/Sponsor";
import "./Sponsors.css";

function Sponsors(): JSX.Element {
    const sponsors: SponsorModel[] = [
        new SponsorModel("sparlogo.png", "#"),
        new SponsorModel("keshetlogo.png", "https://www.keshet-teamim.co.il/"),
        // new SponsorModel("vasilenkocarrentallogo.png", "alexandervasilenko99.github.io/car-rental/"),
        new SponsorModel("vasilenkocarrentallogo2.png", "alexandervasilenko99.github.io/car-rental/"),
        new SponsorModel("tevalogo.png", "#"),
        new SponsorModel("msclogo.png", "#"),
        new SponsorModel("enilogo.png", "#"),
    ]
    return (
        <div className="Sponsors">
            <p>Make a visit and support us by supporting our sponsors:</p>
            <div className="sponsors-container">
                {sponsors.map(s => <Sponsor imageName={s.imageName} redirectTo={s.redirectTo} />)}
            </div>
        </div>
    );
}

export default Sponsors;
