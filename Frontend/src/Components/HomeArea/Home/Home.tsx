import UseTitle from "../../../Utils/UseTitle";
import "./Home.css";

function Home(): JSX.Element {
    UseTitle("Vasilenko Vacations");

    return (
        <div className="Home">
            <h2>Vasilenko Vacations</h2>
        </div>
    );
}

export default Home;
