import ReactPlayer from "react-player";
import UseTitle from "../../../Utils/UseTitle";
import "./Home.css";

function Home(): JSX.Element {
    UseTitle("Vasilenko Vacations");

    return (
        <div className="Home">
            <ReactPlayer url={require("../../../Assets/Videos/intro-vid.mp4")}
                muted playing loop width="100%" height="100%" />
        </div>
    );
}

export default Home;
