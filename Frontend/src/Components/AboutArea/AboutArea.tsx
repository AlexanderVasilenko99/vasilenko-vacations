import UseTitle from "../../Utils/UseTitle";
import "./AboutArea.css";

function AboutArea(): JSX.Element {
    UseTitle("Vasilenko Vacations | About");
    return (
        <div className="AboutArea">
            <h1>
                About me & this project
            </h1>
        </div>
    );
}

export default AboutArea;
