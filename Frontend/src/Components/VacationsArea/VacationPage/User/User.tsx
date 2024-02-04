import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import vacationService from "../../../../Services/VacationService";
import appConfig from "../../../../Utils/AppConfig";
import UseIsLoggedIn from "../../../../Utils/UseIsLoggedIn";
import "./User.css";

function User(): JSX.Element {
    UseIsLoggedIn(true, "You must be logged in to vies this page!🥴", "/login");

    const [v, setV] = useState<VacationModel>();
    const params = useParams();
    const uuid = params.uuid;

    useEffect(() => {
        vacationService.getOneVacation(uuid)
            .then(vacation => {
                setV(vacation);
            })
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className="User">
            <h1><NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink></h1>
            <div className="grid-container">
                <div className="left">
                    <div className="image-background">
                        <img src={v?.vacationImageUrl} />
                    </div>
                </div>
                <div className="right">
                    <form>
                        <div>
                            <h3 id="vacation-destination">Destination:</h3>
                            <div className="vacation-destination">
                                <label>{v?.vacationCity} - {v?.vacationCountry}</label>
                                <img
                                    className="country-image"
                                    src={`https://flagcdn.com/w20/${v?.vacationCountryISO}.png`}>
                                </img>
                            </div>
                        </div>
                        <div>
                            <h3 id="vacation-description">Vacation Description: </h3>
                            <label className="description-label">{v?.vacationDescription}</label>
                        </div>
                        <div>
                            <h3 id="vacation-price">Vacation Price: </h3>
                            <label>{v?.vacationPrice}$</label>
                        </div>
                        <div>
                            <h3 id="vacation-start">Vacation Dates: </h3>
                            <label>{v?.vacationStartDate.toString()} - {v?.vacationEndDate.toString()}</label>
                        </div>
                    </form>
                </div>
            </div >
            <h1><NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink></h1>
        </div >
    );
}

export default User;
