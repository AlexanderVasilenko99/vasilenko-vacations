import SponsorModel from "../../../Models/SponsorModel";
import Sponsor from "./Sponsor/Sponsor";
import "./Sponsors.css";

function Sponsors(): JSX.Element {
    const sponsors: SponsorModel[] = [
        new SponsorModel("spar", "sparlogo.png", "https://spar-international.com/"),
        new SponsorModel("keshet", "keshetlogo.png", "https://www.keshet-teamim.co.il/"),
        new SponsorModel("vasicarrental", "vasilenkocarrentallogo2.png", "https://alexandervasilenko99.github.io/car-rental/"),
        new SponsorModel("teva", "tevalogo.png", "https://www.tevapharm.com/"),
        new SponsorModel("msccruis", "msclogo.png", "https://msccruises.co.il/en/"),
        new SponsorModel("enil", "enilogo.png", "https://www.eni.com/en-IT/home.html"),
    ]
    return (
        <div className="Sponsors">
            <p>Make a visit and support us by supporting our sponsors:</p>
            <div className="sponsors-container">
                {sponsors.map(s => <Sponsor
                    key={s.key}
                    imageName={s.imageName}
                    redirectTo={s.redirectTo}
                />)}
            </div>
        </div>
    );
}

export default Sponsors;
