import { useEffect, useState } from "react";
import "./VacationsList.css";
import vacationService from "../../../Services/VacationService";
import VacationModel from "../../../Models/VacationModel";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="VacationsList">
            {vacations.map(v=><div>{v.vacationCountry}</div>)}
        </div>
    );
}

export default VacationsList;
