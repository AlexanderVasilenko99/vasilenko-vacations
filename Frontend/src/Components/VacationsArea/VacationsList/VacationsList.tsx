import { useEffect } from "react";
import "./VacationsList.css";
import vacationService from "../../../Services/VacationService";

function VacationsList(): JSX.Element {
    useEffect(() => {
        vacationService.getAllVacations()
    }, []);
    return (
        <div className="VacationsList">

        </div>
    );
}

export default VacationsList;
