import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import { authStore } from "../../../Redux/AuthState";
import noti from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import UseTitle from "../../../Utils/UseTitle";
import { Autocomplete, Box, Slider, TextField } from '@mui/material';

function VacationsList(): JSX.Element {
    UseTitle("Vasilenko Vacations | Vacations");
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [displayedVacations, setDisplayedVacations] = useState<VacationModel[]>([]);

    const [vacationCountries, setVacationCountries] = useState<string[]>([]);

    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const datesOptions: string[] = authStore.getState().user.userRoleId === 1 ? ["Past Vacations", "Ongoing Vacations", "Future Vacations", "All Vacations"] : ["Past Vacations", "Ongoing Vacations", "Future Vacations", "Followed Vacations", "All Vacations"];
    useEffect(() => {
        const token = authStore.getState().token;
        if (!token) {
            noti.error("Please login in to view vacations page");
            navigate("/login");
        }

        vacationService.getAllVacations()
            .then(vacations => {
                setVacations(vacations);
                setDisplayedVacations(vacations);
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        const countries: string[] = [];
        vacations.forEach(v => countries.push(v.vacationCountry));
        setVacationCountries(countries);
    }, [vacations]);

    return (
        <div className="VacationsList">
            <h1>Browse All</h1>
            <h2 className="general-info"><span>Or search a vacation:</span><span className="results">Showing {displayedVacations.length} results</span></h2>
            <div className={accordionOpen ? "filter-container accordion-open" : "filter-container accordion-close"}>
                <div className="filter-headers">
                    <h2 className="filter" onClick={() => setAccordionOpen(!accordionOpen)}>Filter</h2>
                    <h2 className="reset" onClick={() => setDisplayedVacations(vacations)}>Reset</h2>
                </div>
                <div className="filter-hidden-content">
                    <div className="autocompletes">
                        <Autocomplete
                            onChange={(event, value) => {
                                let v: VacationModel[] = [];
                                const now = new Date().getTime();
                                switch (value) {
                                    case "Past Vacations":
                                        v = vacations.filter(v => new Date(v.vacationStartDate).getTime() < now &&
                                            new Date(v.vacationEndDate).getTime() < now);
                                        break;
                                    case "Ongoing Vacations":
                                        v = vacations.filter(v => new Date(v.vacationStartDate).getTime() < now &&
                                            new Date(v.vacationEndDate).getTime() > now);
                                        break;
                                    case "Future Vacations":
                                        v = vacations.filter(v => new Date(v.vacationStartDate).getTime() > now &&
                                            new Date(v.vacationEndDate).getTime() > now);
                                        break;
                                    case "Followed Vacations":
                                        console.log("Displaying Followed Vacations");
                                        break;
                                    case "All Vacations":
                                    case null:
                                        v = vacations;
                                        break;
                                    default:
                                        break;
                                }
                                setDisplayedVacations(v);
                            }}
                            disablePortal
                            id="full-name-combo-box"
                            options={datesOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Dates" />} />


                        <Autocomplete
                            onChange={(event, value) => {
                                console.log(event, value);
                                // const newSVals: searchValues = { ...searchValuesForm }
                                // if (value == null) { newSVals.name = ""; }
                                // else { newSVals.name = value; }
                                // setSearchValuesForm(newSVals);
                            }}
                            disablePortal
                            id="full-name-combo-box"
                            options={vacationCountries}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Country" />} />
                    </div>
                </div>
            </div>
            <div className="vacations-container">
                {displayedVacations.map(v => <VacationCard key={v.vacationUUID}
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
        </div >
    );
}

export default VacationsList;
