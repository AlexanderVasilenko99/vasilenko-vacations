import { useParams } from "react-router-dom";
import "./VacationPage.css";
import { useEffect, useState } from "react";
import UseTitle from "../../../Utils/UseTitle";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationService";

function VacationPage(): JSX.Element {
    const [vacation, setVacation] = useState<VacationModel>();
    const params = useParams();
    const uuid = params.uuid;
    useEffect(() => {
        vacationService.getVacationByUUID(uuid)
            .then(vacation => {
                setVacation(vacation);
            })
            .catch(err => console.log(err));
    }, []);
    UseTitle(`Vasilenko Vacations | ${uuid}`);
    return (
        <div className="VacationPage">
            {vacation?.vacationCity} - {vacation?.vacationCountry}
        </div>
    );
}

export default VacationPage;
