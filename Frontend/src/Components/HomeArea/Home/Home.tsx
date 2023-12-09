import UseTitle from "../../../Utils/UseTitle";
import "./Home.css";

function Home(): JSX.Element {
    UseTitle("NorthWind");

    return (
        <div className="Home">
            <h2>Welcome to NorthWind Traders Inc website</h2>
        </div>
    );
}

export default Home;
