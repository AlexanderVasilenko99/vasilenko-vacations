import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import vacationService from "../../../Services/VacationService";
import UseTitle from "../../../Utils/UseTitle";
import EditVacation from "../EditVacation/EditVacation";
import "./VacationPage.css";

function VacationPage(): JSX.Element {
    UseTitle(`Vasilenko Vacations | Vacations`);
    const [vacation, setVacation] = useState<VacationModel>();
    const params = useParams();
    const uuid = params.uuid;
    console.log(uuid);
    
    useEffect(() => {
        vacationService.getOneVacation(uuid)
            .then(vacation => {
                setVacation(vacation);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="VacationPage">
            {vacation?.vacationCity} - {vacation?.vacationCountry}

            {authStore.getState().user?.userRoleId === 1 && <EditVacation />}

        </div>
    );
}

export default VacationPage;
