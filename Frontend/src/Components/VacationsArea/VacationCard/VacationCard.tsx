import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from '../../../Redux/AuthState';
import appConfig from '../../../Utils/AppConfig';
import DeleteButton from './DeleteButton/DeleteButton';
import EditButton from './EditButton/EditButton';
import LikeButton from "./LikeButton/LikeButton";
import "./VacationCard.css";
import { vacationsStore } from '../../../Redux/VacationsState';

function VacationCard(vacation: VacationModel): JSX.Element {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const navigate = useNavigate();
    useEffect(() => {
        console.log("rendering vacation" + vacation.vacationCity);
        
        const startDate = new Date(vacation.vacationStartDate?.toString().substring(0, 10));
        const endDate = new Date(vacation.vacationEndDate?.toString().substring(0, 10));
        setStartDate(startDate.toLocaleDateString('en-GB'));
        setEndDate(endDate.toLocaleDateString('en-GB'));
    }, []);

    return (
        <div className="VacationCard" key={vacation.vacationId}
        // onClick={() => navigate(appConfig.vacationsRoute + vacation.vacationUUID)}
        >
            <div className="follow-container">
                {authStore.getState().user.userRoleId === 2 && <LikeButton
                    isFollowing={vacation.vacationIsFollowing}
                    userUUID={authStore.getState().user?.userUUID}
                    vacationUUID={vacation.vacationUUID}
                />}
                {authStore.getState().user.userRoleId === 1 && <EditButton />}
                {authStore.getState().user.userRoleId === 1 && <DeleteButton {...vacation} />}
            </div>
            <div>
                <img src={vacation.vacationImageUrl} className='vacation-image'/>
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
                    <NavLink to={appConfig.vacationsRoute + vacation.vacationUUID} >
                        <span>{vacation.vacationPrice}$</span>
                    </NavLink>
                </div>
            </div>
        </div >
    );
}

export default VacationCard;
