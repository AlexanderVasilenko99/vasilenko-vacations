import UseTitle from "../../Utils/UseTitle";
import Header from "../Common/header/header";
import "./AboutArea.css";

function AboutArea(): JSX.Element {
    UseTitle("Vasilenko Vacations | About");
    return (
        <div className="AboutArea">
            <Header {...{ title: "About Me & This Project" }} />
        </div>
    );
}

export default AboutArea;
