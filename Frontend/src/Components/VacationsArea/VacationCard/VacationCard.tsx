import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { NavLink, useNavigate } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function VacationCard(vacation: VacationModel): JSX.Element {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const navigate = useNavigate();
    useEffect(() => {
        // console.log(console.log(vacation.vacationStartDate.toString().substring(0,10)));
        const startDate = new Date(vacation.vacationStartDate.toString().substring(0, 10));
        const endDate = new Date(vacation.vacationEndDate.toString().substring(0, 10));
        // console.log(d.toLocaleDateString());
        setStartDate(startDate.toLocaleDateString('en-GB'));
        setEndDate(endDate.toLocaleDateString('en-GB'));
    }, []);
    return (
        <div className="VacationCard" key={vacation.vacationId}
        // onClick={() => navigate(appConfig.vacationsRoute + vacation.vacationUUID)}
        >
            <div className="follow-container">
                <button onClick={() => console.log("click")}><FavoriteBorderIcon /></button>
            </div>
            <div>
                <img src={vacation.vacationImageUrl} />
            </div>
            <div className="card-text-container">
                <div className="country-dates-container">
                    <div className="country-container">
                        <img src="https://flagcdn.com/w20/ua.png" alt={vacation.vacationCountry}></img>
                        {vacation.vacationCountry}
                    </div>
                    <div className="dates-container">
                        {startDate} - {endDate}
                    </div>
                </div>
                <div className="city-container">
                    <PublicOutlinedIcon /> {vacation.vacationCity} - {vacation.vacationCountry}
                </div>
                <div className="description-container">
                    {vacation.vacationDescription}
                </div>
                <div className="price-container">
                    <NavLink to={"#"}>
                        <span>{vacation.vacationPrice}$</span>
                    </NavLink>
                </div>
            </div>
        </div >
    );
}

export default VacationCard;
