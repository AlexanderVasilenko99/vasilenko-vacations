import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

function VacationCard(vacation: VacationModel): JSX.Element {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    useEffect(() => {
        // console.log(console.log(vacation.vacationStartDate.toString().substring(0,10)));
        const startDate = new Date(vacation.vacationStartDate.toString().substring(0, 10));
        const endDate = new Date(vacation.vacationEndDate.toString().substring(0, 10));
        // console.log(d.toLocaleDateString());
        setStartDate(startDate.toLocaleDateString('en-GB'));
        setEndDate(endDate.toLocaleDateString('en-GB'));
    }, []);
    return (
        <div className="VacationCard" key={vacation.vacationId}>
            <div>
                <img src={vacation.vacationImageUrl} />
            </div>
            <div className="card-text-container">
                <div className="country-dates-container">
                    <div className="country-container">
                        <PublicOutlinedIcon />{vacation.vacationCountry}
                    </div>
                    <div>
                        {startDate} - {endDate}
                    </div>

                </div>
                <div className="city-container">
                    <PublicOutlinedIcon /> {vacation.vacationCity} - {vacation.vacationCountry}
                </div>
                <div className="description-container">
                    {vacation.vacationDescription}
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
