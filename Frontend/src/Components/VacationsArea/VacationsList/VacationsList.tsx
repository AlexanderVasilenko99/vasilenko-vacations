import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import { authStore } from "../../../Redux/AuthState";
import noti from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import UseTitle from "../../../Utils/UseTitle";

function VacationsList(): JSX.Element {
    UseTitle("Vasilenko Vacations | Vacations");
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = authStore.getState().token;
        if (!token) {
            noti.error("Please login in to view vacations page");
            navigate("/login");
        }

        vacationService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => console.log(err));
    }, []);
    return (
        <div className="VacationsList">
            <h1>Browse All</h1>
            <h2 className="general-info"><span>Or search a vacation:</span><span className="results">Showing {vacations.length} results</span></h2>
            <div className="filter-container">
                <div className="filter-headers">
                    <h2 className="filter">Filter</h2>
                    <h2 className="reset">Reset</h2>
                </div>
            </div>
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
