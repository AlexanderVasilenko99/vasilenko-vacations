import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { iso31661 } from "iso-3166";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import VacationModel from "../../../../Models/VacationModel";
import noti from "../../../../Services/NotificationService";
import vacationService from "../../../../Services/VacationService";
import appConfig from "../../../../Utils/AppConfig";
import UseIsAdmin from "../../../../Utils/UseIsAdmin";
import "./Admin.css";

function Admin(): JSX.Element {
    UseIsAdmin(true, "Only administrators can access this page!", "/vacations");

    const navigate = useNavigate();
    const params = useParams();
    const uuid = params.uuid;

    const [iso, setISO] = useState<string>("");
    const [v, setV] = useState<VacationModel>();
    const filter = createFilterOptions<string>();
    const [imgSrc, setImgSrc] = useState<string>("");
    const [minDate, setMinDate] = useState<string>('');
    const [countries, setCountries] = useState<string[]>([]);
    const [countryName, setCountryName] = useState<string>('');
    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const [isCountryInputCustom, setIsCountryInputCustom] = useState<boolean>(false);

    useEffect(() => {
        const dummyCountries: string[] = [];
        iso31661.forEach(countryObj => dummyCountries.push(countryObj.name + " " + countryObj.alpha2));
        setCountries(dummyCountries)


        vacationService.getOneVacation(uuid)
            .then(vacation => {
                setV(vacation);
                setValue("vacationCity", vacation.vacationCity);
                setValue("vacationCountry", vacation.vacationCountry);
                setValue("vacationDescription", vacation.vacationDescription);
                setValue("vacationPrice", vacation.vacationPrice);
                setImgSrc(vacation.vacationImageUrl);
                setValue("vacationStartDate", vacation.vacationStartDate);
                setValue("vacationEndDate", vacation.vacationEndDate);
                setMinDate(vacation.vacationStartDate.toString());
                setISO(vacation.vacationCountryISO);
                setCountryName(vacation.vacationCountry)
            })
            .catch((err) => console.log(err));
    }, []);

    function handleChange(e: any): void {
        console.log("changing image");
        if (e) {
            const file = (e.target.files)[0];
            const url = URL.createObjectURL(file);
            setImgSrc(url);
        }
    }

    function toggleEdit(): void { setIsFormDisabled(!isFormDisabled) }

    async function update(vacation: VacationModel): Promise<void> {
        try {
            const countryInput = document.getElementById("countriesAutocomplete") as HTMLInputElement;
            const fullCountry: string = countryInput.value;

            vacation.vacationUUID = uuid;
            vacation.vacationCountryISO = iso;
            vacation.vacationCountry = fullCountry;
            vacation.vacationImageUrl = v.vacationImageUrl;
            vacation.vacationImageName = v.vacationImageName;

            // console.log("country doesnt exist");

            console.log(vacation);


            if (fullCountry.length <= 2) {
                throw new Error("Please select a country!")
            }
            const country = fullCountry.substring(0, fullCountry.length - 3);
            if (country.length > 100) {
                throw new Error("Country name can't exceed 100 chars!")
            }
            vacation.vacationCountry = country;

            if (vacation.vacationUploadedImage)
                vacation.vacationUploadedImage = (vacation.vacationUploadedImage as unknown as FileList)[0];

            await vacationService.updateVacation(vacation);
            noti.success("The vacation has been updated successfully!");
            navigate(appConfig.vacationsRoute);

        } catch (err: any) {
            noti.error(err);
        }
    }

    return (
        <div className="Admin">
            <h1>
                <NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink>
                <button className="toggle-edit-button" onClick={toggleEdit}>
                    {isFormDisabled ? "Enable" : "Disable"} Editing
                </button>
            </h1>
            <div className="grid-container">

                <div className="left">
                    <div>
                        <h3>Summary</h3>
                        <ul>
                            <li><HashLink smooth to="#vacation-country">
                                Vacation Country</HashLink></li>
                            <li><HashLink smooth to="#vacation-city">
                                Vacation City</HashLink></li>
                            <li><HashLink smooth to="#vacation-description">
                                Vacation Description</HashLink></li>
                            <li><HashLink smooth to="#vacation-price">
                                Vacation Price</HashLink></li>
                            <li><HashLink smooth to="#vacation-start">
                                Vacation Dates</HashLink></li>
                            <li><HashLink smooth to="#vacation-image">
                                Vacation Image</HashLink></li>
                        </ul>
                    </div>
                </div>


                <div className="right">
                    <form onSubmit={handleSubmit(update)}>
                        <div className="country-container">
                            <h3 id="vacation-country">Vacation Country: </h3>
                            {iso && <img src={`https://flagcdn.com/w20/${iso}.png`} className="country-image"></img>}
                        </div>
                        {/* <input type="text" {...register("vacationCountry")}
                            required minLength={2} maxLength={100} disabled={isFormDisabled} /> */}

                        {countryName && iso && <Autocomplete id="countriesAutocomplete"
                            disabled={isFormDisabled}
                            // {...register("vacationCountry")}
                            defaultValue={countryName + " " + iso.toUpperCase()}
                            onChange={(event, value: string) => {
                                if (value) {
                                    console.log(value);
                                }

                                const countryInput = document.getElementById("countriesAutocomplete") as HTMLInputElement;
                                countryInput.value = value;

                                if (value) setISO(value.substring(value.length - 2, value.length).toLowerCase())
                                else setISO("il");
                            }}
                            disablePortal
                            options={countries}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Dates" />}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option);
                                if (inputValue !== '' && !isExisting) {
                                    filtered.push(`${inputValue}`);
                                }

                                return filtered;
                            }}
                        />}

                        <h3 id="vacation-city">Vacation City: </h3>
                        <input type="text"
                            required
                            minLength={2}
                            maxLength={100}
                            disabled={isFormDisabled}
                            {...register("vacationCity")}
                        />

                        <h3 id="vacation-description">Vacation Description: </h3>
                        <textarea
                            rows={3}
                            required
                            minLength={2}
                            maxLength={100}
                            disabled={isFormDisabled}
                            {...register("vacationDescription")}
                        />

                        <h3 id="vacation-price">Vacation Price: </h3>
                        <input
                            type="number"
                            min={0}
                            required
                            max={9999}
                            disabled={isFormDisabled}
                            {...register("vacationPrice")}
                        />

                        <div className="dates-container">
                            <div className="startDate">
                                <h3 id="vacation-start">Vacation Start Date: </h3>
                                <input
                                    type="date"
                                    required
                                    disabled={isFormDisabled}
                                    {...register("vacationStartDate")}
                                    onChange={(e) => { setMinDate(e.target.value) }} />
                            </div>
                            <div className="endDate">
                                <h3>Vacation End Date: </h3>
                                <input
                                    required
                                    type="date"
                                    min={minDate}
                                    disabled={isFormDisabled}
                                    {...register("vacationEndDate")}
                                />
                            </div>
                        </div>
                        <div className="image-section-container">
                            <h3 id="vacation-image">Vacation image: </h3>
                            <input
                                type="file"
                                accept="image/*"
                                id="image-file-input"
                                className="imageInput"
                                disabled={isFormDisabled}
                                onChangeCapture={handleChange}
                                {...register("vacationUploadedImage")} />
                        </div>
                        <div className="imageContainer">
                            <img src={imgSrc} />
                        </div>
                        <div className="button-container">
                            <button disabled={isFormDisabled}>Update Vacation</button>
                        </div>
                    </form>
                </div>
            </div >
            <h1><NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink></h1>
        </div >
    );
}

export default Admin;
