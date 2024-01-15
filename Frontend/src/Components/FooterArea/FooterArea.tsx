import "./FooterArea.css";
import Rights from "./Rights/Rights";
import Sponsors from "./Sponsors/Sponsors";

function FooterArea(): JSX.Element {
    return (
        <div className="FooterArea">
            <Sponsors />
            <Rights />
        </div>
    );
}

export default FooterArea;
