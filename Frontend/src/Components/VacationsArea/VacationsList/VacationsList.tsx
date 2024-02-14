import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { NavLink } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import ItemsPropsModel from '../../../Models/ItemsPropsModel';
import PaginatedItemsPropsModel from '../../../Models/PaginatedItemsPropsModel';
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import vacationService from "../../../Services/VacationService";
import appConfig from "../../../Utils/AppConfig";
import UseIsLoggedIn from "../../../Utils/UseIsLoggedIn";
import UseTitle from "../../../Utils/UseTitle";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";

function VacationsList(): JSX.Element {
    UseTitle("Vasilenko Vacations | Vacations");
    UseIsLoggedIn(true, "You must be logged in to view our vacations!🥴", "/login");

    const isAdmin = authStore.getState().user?.userRoleId === 1 ? true : false;
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
    const [displayedVacations, setDisplayedVacations] = useState<VacationModel[]>([]);

    const [vacationCountries, setVacationCountries] = useState<string[]>([]);
    const [displayedVacationCountries, setDisplayedVacationCountries] = useState<string[]>([]);

    const priceRangesOptions: string[] = [
        "Under 2500$",
        "2500$ - 5000$",
        "5000$ - 7500$",
        "Above 7500$"
    ]

    const autocompleteDateOptions: string[] = authStore.getState().user?.userRoleId === 1 ? [
        "Past Vacations",
        "Ongoing Vacations",
        "Future Vacations",
        "All Vacations"
    ] : [
        "Past Vacations",
        "Ongoing Vacations",
        "Future Vacations",
        "Followed Vacations",
        "All Vacations"
    ];


    function Items({ currentItems }: ItemsPropsModel): JSX.Element {
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

    function PaginatedItems({ itemsPerPage }: PaginatedItemsPropsModel): JSX.Element {
        const [itemOffset, setItemOffset] = useState(0);
        const [selectedPage, setSelectedPage] = useState(0);

        const endOffset = itemOffset + itemsPerPage;
        let currentItems = vacationsStore.getState().vacations;
        currentItems = filterDisplayedVacations(currentItems);
        currentItems = currentItems.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(displayedVacationCountries.length / itemsPerPage);

        const handlePageClick = (event: { selected: number }) => {
            const newOffset = (event.selected * itemsPerPage) % displayedVacationCountries.length;
            setSelectedPage(event.selected);
            setItemOffset(newOffset);
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
                />
            </>
        );
    }

    function filterVacationsByDates(vacationsArray: VacationModel[], dates: string): VacationModel[] {
        let newVacations = [...vacationsArray];
        dates = dates.toLowerCase();
        const now = new Date().getTime();
        switch (dates) {
            case "past vacations":
                newVacations = vacationsArray.filter(v => new Date(v.vacationStartDate).getTime() < now &&
                    new Date(v.vacationEndDate).getTime() < now);
                break;
            case "ongoing vacations":
                newVacations = vacationsArray.filter(v => new Date(v.vacationStartDate).getTime() < now &&
                    new Date(v.vacationEndDate).getTime() > now);
                break;
            case "future vacations":
                newVacations = vacationsArray.filter(v => new Date(v.vacationStartDate).getTime() > now &&
                    new Date(v.vacationEndDate).getTime() > now);
                break;
            case "followed vacations":
                newVacations = vacationsArray.filter(v => v.vacationIsFollowing === 1)
                break;
            case "all vacations":
            case "no timeframe":
                newVacations = vacationsStore.getState().vacations;
                break;
            default:
                break;
        }
        return newVacations;
    }

    function filterVacationsByCountry(vacationsArray: VacationModel[], country: string): VacationModel[] {
        let newVacations = [...vacationsArray];
        country = country.toLowerCase()
        switch (country) {
            case "no country":
            case '':
                break;
            default:
                newVacations = vacations.filter(v => v.vacationCountry.toLowerCase() === country);
                break;
        }
        return newVacations;
    }

    function filterVacationsByPriceRange(vacationsArray: VacationModel[], priceRange: string): VacationModel[] {
        let newVacations = [...vacationsArray];
        priceRange = priceRange.toLowerCase()
        switch (priceRange) {
            case 'under 2500$':
                newVacations = vacationsArray.filter(v => v.vacationPrice < 2500);
                break;
            case '2500$ - 5000$':
                newVacations = vacationsArray.filter(v => v.vacationPrice >= 2500 && v.vacationPrice < 5000);
                break;
            case '5000$ - 7500$':
                newVacations = vacationsArray.filter(v => v.vacationPrice >= 5000 && v.vacationPrice < 7500);
                break;
            case 'above 7500$':
                newVacations = vacationsArray.filter(v => v.vacationPrice >= 7500);
                break;
            case 'no price range':
            case '':
            default:
                break;
        }
        return newVacations;
    }

    function filterDisplayedVacations(arr: VacationModel[]): VacationModel[] {
        const countryInput = document.getElementById("countryAutocomplete") as HTMLInputElement;
        const priceRangeInput = document.getElementById("priceAutocomplete") as HTMLInputElement;
        const datesInput = document.getElementById("datesAutocomplete") as HTMLInputElement;
        let country = countryInput?.value;
        let priceRange = priceRangeInput?.value;
        let dates = datesInput?.value;
        let newVacations = [...arr];

        newVacations = dates ? filterVacationsByDates(vacations, dates) : filterVacationsByDates(vacations, '');
        newVacations = priceRange ? filterVacationsByPriceRange(newVacations, priceRange) : filterVacationsByPriceRange(newVacations, '');
        newVacations = country ? filterVacationsByCountry(newVacations, country) : filterVacationsByCountry(newVacations, '');

        return newVacations;
    }

    function handleAutocompleteChange(): void {
        const newVacations = filterDisplayedVacations(vacations);
        let newVacationCountries: string[] = [];
        newVacations.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));

        setDisplayedVacations(newVacations);
        setDisplayedVacationCountries(newVacationCountries);
    }

    function resetSearchForm(): void {
        setAccordionOpen(true);
        setDisplayedVacations(vacations);
        const datesInput = document.getElementsByClassName("MuiAutocomplete-clearIndicator")[0] as HTMLButtonElement;
        const priceRangeInput = document.getElementsByClassName("MuiAutocomplete-clearIndicator")[1] as HTMLButtonElement;
        const countryInput = document.getElementsByClassName("MuiAutocomplete-clearIndicator")[2] as HTMLButtonElement;

        datesInput?.click();
        countryInput?.click();
        priceRangeInput?.click();
    }

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => {
                const countries: string[] = [];

                setVacations(vacations);
                setDisplayedVacations(vacations);
                vacations.forEach(v => countries.push(v.vacationCountry));
                setVacationCountries(countries);
                setDisplayedVacationCountries(countries);
            })
            .catch(err => console.log(err));

        const unsubscribe = vacationsStore.subscribe(() => {
            const curValue: VacationModel[] = vacationsStore.getState().vacations;

            setVacations(curValue);
            setDisplayedVacations(filterDisplayedVacations(curValue));

            let newVacationCountries: string[] = [];
            curValue.forEach(vacation => newVacationCountries.push(vacation.vacationCountry));

            setDisplayedVacationCountries(newVacationCountries);
        });

        return unsubscribe;
    }, []);

    return (
        <div className="VacationsList">
            <div className="headers-container">
                <h1>Browse Vacations</h1>
                {isAdmin && <NavLink to={appConfig.addVacationRoute}>Add Vacation</NavLink>}
            </div>
            <h2 className="general-info">
                <span>Or search a vacation:</span>
                <span className="results">Showing {displayedVacationCountries?.length} results</span></h2>

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
                            onChange={() => {
                                setTimeout(() => handleAutocompleteChange(), 0);
                            }}
                            disablePortal
                            options={autocompleteDateOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Dates" />}
                        />
                        <Autocomplete id="priceAutocomplete"
                            onChange={() => {
                                setTimeout(() => handleAutocompleteChange(), 0)
                            }}
                            disablePortal
                            options={priceRangesOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Price Range" />}
                        />
                        <Autocomplete id="countryAutocomplete"
                            onChange={() => {
                                setTimeout(() => handleAutocompleteChange(), 0)
                            }}
                            disablePortal
                            options={displayedVacationCountries}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Country" />}
                        />
                    </div>
                </div>
            </div>}
            <div className="vacations-container">
                {vacations.length === 0 && <MoonLoader color="#1a5785" loading />}
                <PaginatedItems itemsPerPage={9} />
            </div>
        </div >
    );
}

export default VacationsList;
