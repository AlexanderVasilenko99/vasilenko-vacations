import ReactPlayer from "react-player";
import { NavLink } from "react-router-dom";
import UseTitle from "../../../Utils/UseTitle";
import "./Home.css";

function Home(): JSX.Element {
    UseTitle("Vasilenko Vacations");

    return (
        <div className="Home">
            <NavLink to={"https://www.linkedin.com/in/alexander-vasilenko-323a21299/"} target="_blank">
                <ReactPlayer url={require("../../../Assets/Videos/intro-vid.mp4")}
                    muted playing loop width="100%" height="100%" />
            </NavLink>
        </div>
    );
}

export default Home;
