import { useEffect, useState } from "react";
import "./VacationsList.css";
import vacationService from "../../../Services/VacationService";
import VacationModel from "../../../Models/VacationModel";
import VacationCard from "../VacationCard/VacationCard";

function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="VacationsList">
            <div className="vacations-container">
                {vacations.map(v => <VacationCard
                    vacationUUID={v.vacationUUID}
                    vacationCity={v.vacationCity}
                    vacationCountry={v.vacationCountry}
                    vacationDescription={v.vacationDescription}
                    vacationId={v.vacationId}
                    vacationStartDate={v.vacationStartDate}
                    vacationEndDate={v.vacationEndDate}
                    vacationPrice={v.vacationPrice}
                    vacationImageName={v.vacationImageName}
                    vacationImageUrl={v.vacationImageUrl}
                    vacationUploadedImage={v.vacationUploadedImage}
                />)}
            </div>
        </div>
    );
}

export default VacationsList;
