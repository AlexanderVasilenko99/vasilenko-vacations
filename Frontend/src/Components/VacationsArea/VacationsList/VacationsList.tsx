import { useEffect, useRef, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import { authStore } from "../../../Redux/AuthState";
import noti from "../../../Services/NotificationService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import UseTitle from "../../../Utils/UseTitle";
import { Autocomplete, Box, Slider, TextField } from '@mui/material';
import { vacationsStore } from "../../../Redux/VacationsState";
import { createStore } from "redux";
import Header from "../../Common/header/header";
import UseIsLoggedIn from "../../../Utils/UseIsLoggedIn";
import MoonLoader from "react-spinners/MoonLoader";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import ReactPaginate from 'react-paginate';

// this is for useSearchParams to be added on later
// class SearchValues {
//     public dates: string;
//     public country: string;
//     public minP: number;
//     public maxP: number;
//     public constructor(values: SearchValues) {
//         this.dates = values.dates;
//         this.country = values.country;
//         this.minP = values.minP;
//         this.maxP = values.maxP;
//     }
// }

function VacationsList(): JSX.Element {
    UseTitle("Vasilenko Vacations | Vacations");
    UseIsLoggedIn(true, "You must be logged in to view our vacations!🥴");

    const navigate = useNavigate();

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [displayedVacations, setDisplayedVacations] = useState<VacationModel[]>([]);

    const [vacationCountries, setVacationCountries] = useState<string[]>([]);
    const [displayedVacationCountries, setDisplayedVacationCountries] = useState<string[]>([]);

    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
    const datesOptions: string[] = authStore.getState().user?.userRoleId === 1 ?
        ["Past Vacations", "Ongoing Vacations", "Future Vacations", "All Vacations"] :
        ["Past Vacations", "Ongoing Vacations", "Future Vacations", "Followed Vacations", "All Vacations"];

    interface ItemsProps {
        currentItems: VacationModel[];
    }
    interface PaginatedItemsProps {
        itemsPerPage: number;
    }

    function Items({ currentItems }: ItemsProps): JSX.Element {
        return (
            <>
                {currentItems &&
                    currentItems.map(v => <VacationCard key={v.vacationUUID}
                        vacationUUID={v.vacationUUID}
                        vacationCity={v.vacationCity}
                        vacationCountry={v.vacationCountry}
                        vacationDescription={v.vacationDescription}
                        vacationId={v.vacationId}
                        vacationStartDate={v.vacationStartDate}
                        vacationEndDate={v.vacationEndDate}
                        vacationPrice={v.vacationPrice}
                        vacationCountryISO={v.vacationCountryISO}
                        vacationImageName={v.vacationImageName}
                        vacationImageUrl={v.vacationImageUrl}
                        vacationUploadedImage={v.vacationUploadedImage}
                        vacationIsFollowing={v.vacationIsFollowing}
                        vacationFollowersCount={v.vacationFollowersCount} />
                    )}
            </>
        );
    }

    function PaginatedItems({ itemsPerPage }: PaginatedItemsProps): JSX.Element {
        const [itemOffset, setItemOffset] = useState(0);
        const [selectedPage, setSelectedPage] = useState(0);

        const endOffset = itemOffset + itemsPerPage;
        const currentItems = displayedVacations.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(displayedVacations.length / itemsPerPage);
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

        const handlePageClick = (event: { selected: number }) => {
            const newOffset = (event.selected * itemsPerPage) % displayedVacations.length;
            setSelectedPage(event.selected);
            setItemOffset(newOffset);
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        };

        return (
            <>
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={0}
                    marginPagesDisplayed={2}
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    onPageChange={handlePageClick}
                    renderOnZeroPageCount={null}
                    forcePage={selectedPage}
                />
                <Items currentItems={currentItems} />
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={0}
                    marginPagesDisplayed={2}
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    onPageChange={handlePageClick}
                    renderOnZeroPageCount={null}
                    forcePage={selectedPage}
                />
            </>
        );
    }

    function setVacationsAndVacationCountriesForDisplay(timeFrame: string, country: string): void {
        console.log("recieved timeframe: " + timeFrame + ". country: " + country);
        let newVacations: VacationModel[] = [];
        let newVacationCountries: string[] = [];

        if (timeFrame) {
            timeFrame = timeFrame.toLowerCase();
            const now = new Date().getTime();
            switch (timeFrame) {
                case "past vacations":
                    newVacations = vacations.filter(v => new Date(v.vacationStartDate).getTime() < now &&
                        new Date(v.vacationEndDate).getTime() < now);
                    newVacations.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));
                    break;
                case "ongoing vacations":
                    newVacations = vacations.filter(v => new Date(v.vacationStartDate).getTime() < now &&
                        new Date(v.vacationEndDate).getTime() > now);
                    newVacations.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));
                    break;
                case "future vacations":
                    newVacations = vacations.filter(v => new Date(v.vacationStartDate).getTime() > now &&
                        new Date(v.vacationEndDate).getTime() > now);
                    newVacations.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));
                    break;
                case "followed vacations":
                    newVacations = vacations.filter(v => v.vacationIsFollowing === 1)
                    newVacations.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));
                    break;
                case "all vacations":
                case "no timeframe":
                    // newVacations = vacations;
                    newVacations = vacationsStore.getState().vacations;
                    newVacations.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));
                    break;
                default:
                    break;
            }
            setDisplayedVacations(newVacations);
            setDisplayedVacationCountries(newVacationCountries)
        }
        if (country) {
            country = country.toLowerCase()
            switch (country) {
                case "no country":
                    break;
                default:
                    newVacations = vacations.filter(v => v.vacationCountry.toLowerCase() === country);
                    newVacations.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));
                    break;
            }
            setDisplayedVacations(newVacations);
            setDisplayedVacationCountries(newVacationCountries)
        }
    }

    function resetSearchForm(): void {
        setDisplayedVacations(vacations);
    }

    useEffect(() => {
        const unsubscribe = vacationsStore.subscribe(() => {
            const arr: VacationModel[] = vacationsStore.getState().vacations;
            setVacations(arr);
            setDisplayedVacations(arr);
            setVacationsAndVacationCountriesForDisplay("no timeframe", "no country");
        });

        vacationService.getAllVacations()
            .then(v => {
                setVacations(v);
                setDisplayedVacations(v);

                const countries: string[] = [];
                v.forEach(v1 => countries.push(v1.vacationCountry));
                setVacationCountries(countries);
                setDisplayedVacationCountries(countries);
            })
            .catch(err => console.log(err));
        return unsubscribe;
    }, []);


    return (
        <div className="VacationsList">
            <Header {...{ title: "Browse Vacations" }} />
            <h2 className="general-info">
                <span>Or search a vacation:</span>
                <span className="results">Showing {displayedVacations?.length} results</span></h2>

            {vacations.length !== 0 && <div className={accordionOpen ? "filter-container accordion-open" : "filter-container accordion-close"}>
                <div className="filter-headers">
                    <h2 className="filter"
                        onClick={() => setAccordionOpen(!accordionOpen)}>
                        <TuneOutlinedIcon />Filter</h2>
                    <h2 className="reset"
                        onClick={() => resetSearchForm()}>
                        <RefreshOutlinedIcon />Reset</h2>
                </div>
                <div className="filter-hidden-content">
                    <div className="autocompletes">
                        <Autocomplete id="datesAutocomplete"
                            onChange={(event, value) => {
                                const countryInput = document.getElementById("countryAutocomplete") as HTMLInputElement;
                                const country = countryInput.value;
                                const dates: string = value;

                                if (dates && country) setVacationsAndVacationCountriesForDisplay(dates, country)
                                if (dates && !country) setVacationsAndVacationCountriesForDisplay(dates, "no country")
                                if (!dates && country) setVacationsAndVacationCountriesForDisplay("no timeframe", country)
                                if (!dates && !country) setVacationsAndVacationCountriesForDisplay("no timeframe", "no country")
                            }}
                            disablePortal
                            options={datesOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Dates" />} />

                        <Autocomplete id="countryAutocomplete"
                            onChange={(event, value) => {
                                const datesInput = document.getElementById("datesAutocomplete") as HTMLInputElement;
                                const dates = datesInput.value;
                                const country: string = value;

                                if (dates && country) setVacationsAndVacationCountriesForDisplay(dates, country)
                                if (dates && !country) setVacationsAndVacationCountriesForDisplay(dates, "no country")
                                if (!dates && country) setVacationsAndVacationCountriesForDisplay("no timeframe", country)
                                if (!dates && !country) setVacationsAndVacationCountriesForDisplay("no timeframe", "no country")
                            }}
                            disablePortal
                            options={displayedVacationCountries}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Country" />} />
                    </div>
                </div>
            </div>}
            <div className="vacations-container">
                {vacations.length === 0 &&
                    <MoonLoader
                        color="#1a5785"
                        loading />
                }
                <PaginatedItems itemsPerPage={9} />

                {/* {displayedVacations?.map(v => <VacationCard key={v.vacationUUID}
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
                    vacationIsFollowing={v.vacationIsFollowing}
                    vacationFollowersCount={v.vacationFollowersCount}
                />)} */}
            </div>
        </div >
    );
}

export default VacationsList;
