import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import noti from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationService";
import useImagePreview from "../../../Utils/UseImagePreview";
import UseIsAdmin from "../../../Utils/UseIsAdmin";
import "./AddVacation.css";
import { iso31661 } from "iso-3166";
import { Autocomplete, TextField } from '@mui/material';
import appConfig from "../../../Utils/AppConfig";
import { HashLink } from "react-router-hash-link";

function AddVacation(): JSX.Element {
    UseIsAdmin(true, "Only administrators can access this page!", "/vacations");
    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState<string>('');
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountryISO, setSelectedCountryISO] = useState<string>('il');
    const [isCountryInputCustom, setIsCountryInputCustom] = useState<boolean>(false);

    useEffect(() => {
        const dummyCountries: string[] = [];
        iso31661.forEach(countryObj => dummyCountries.push(countryObj.name + " " + countryObj.alpha2));
        setCountries(dummyCountries)
    }, []);

    async function send(vacation: VacationModel): Promise<void> {
        try {
            const countryInput = document.getElementById("countriesAutocomplete") as HTMLInputElement;
            const fullCountry: string = countryInput?.value;

            if (fullCountry) {

                if (fullCountry.length <= 2) {
                    throw new Error("Please select a country!")
                }
                const country = fullCountry.substring(0, fullCountry.length - 3);
                if (country.length > 100) {
                    throw new Error("Country name can't exceed 100 chars!")
                }
                vacation.vacationCountry = country;
                vacation.vacationCountryISO = selectedCountryISO;
            }
            else if (countryInput) {
                noti.error("Please select a country!");
                countryInput.focus();
                return;
            }
            vacation.vacationUploadedImage = (vacation.vacationUploadedImage as unknown as FileList)[0];

            console.log(vacation);
            const addedVacation = await vacationService.addVacation(vacation);
            noti.success("Vacation has been added successfully!");
            navigate("/vacations");

        } catch (err: any) {
            noti.error(err);
        }
    }

    const [imageFile, setImageFile] = useState<File | null>();
    const imageSrc = useImagePreview(imageFile);
    function handleChange(event: any) {
        const files = event.target.files;
        if (!files || !files.item(0)) return;
        setImageFile(files.item(0));
    }

    return (
        <div className="AddVacation">
            <h1>
                <NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink>
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
                    <form onSubmit={handleSubmit(send)}>
                        <div className="country-container">
                            {/* <img src={`https://flagcdn.com/w20/${selectedCountryISO}.png`} className="countryImage"></img>
                            <label>Vacation Country: </label> */}
                            <h3 id="vacation-country">
                                <span className='custom-country'>{isCountryInputCustom ? "Custom " : ""}</span>
                                Vacation Country:
                            </h3>
                            {selectedCountryISO && <img src={`https://flagcdn.com/w20/${selectedCountryISO}.png`} className="country-image"></img>}
                            <button
                                type='button'
                                className='toggle-default-country-button'
                                onClick={() => setIsCountryInputCustom(!isCountryInputCustom)}>
                                {isCountryInputCustom ? "Regular" : "Custom"} country?
                            </button>
                        </div>
                        {isCountryInputCustom && <>
                            <input type="text"
                                required
                                minLength={2}
                                maxLength={100}
                                {...register("vacationCountry")}
                            />
                            <h3 id="vacation-iso">
                                <span className='custom-country'>{isCountryInputCustom ? "Custom " : ""}</span>
                                Vacation Country ISO:
                            </h3>
                            <input type="text"
                                required
                                minLength={2}
                                maxLength={2}
                                onChangeCapture={(e: any) => {
                                    if (e.target.value.length === 2) setSelectedCountryISO(e.target.value);
                                }}
                                {...register("vacationCountryISO")}
                            />
                        </>}

                        {/* <input type="text"
                    {...register("vacationCountry")}
                    required
                    placeholder="Israel" minLength={2} maxLength={100} /> */}


                        {!isCountryInputCustom && <Autocomplete id="countriesAutocomplete"
                            // {...register("vacationCountry")}
                            onChange={(event, value) => {
                                if (value) setSelectedCountryISO(value.substring(value.length - 2, value.length).toLowerCase())
                                else setSelectedCountryISO("il")
                            }}
                            disablePortal
                            options={countries}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Dates" />}
                        />}


                        <h3 id="vacation-city">Vacation City: </h3>
                        <input
                            required
                            type="text"
                            minLength={2}
                            maxLength={100}
                            {...register("vacationCity")}
                        />

                        <h3 id="vacation-description">Vacation Description: </h3>
                        <textarea
                            required
                            rows={7}
                            cols={20}
                            minLength={2}
                            maxLength={100}
                            {...register("vacationDescription")}
                        />

                        <h3 id="vacation-price">Vacation Price: </h3>
                        <input
                            min={0}
                            required
                            max={9999}
                            type="number"
                            {...register("vacationPrice")}
                        />

                        <div className="dates-container">
                            <div className="startDate">
                                <h3 id="vacation-start">Vacation Start Date: </h3>
                                <input
                                    required
                                    type="date"
                                    {...register("vacationStartDate")}
                                    min={new Date().toJSON().slice(0, 10)}
                                    onChange={(e) => { setMinDate(e.target.value) }}
                                />
                            </div>
                            <div className="endDate">
                                <h3>Vacation End Date: </h3>
                                <input
                                    required
                                    min={minDate}
                                    type="date"
                                    {...register("vacationEndDate")}
                                />
                            </div>
                        </div>
                        <div className="image-section-container">
                            <h3 id="vacation-image">Vacation Image: </h3>
                            <input
                                required
                                type="file"
                                accept="image/*"
                                id="image-file-input"
                                className="imageInput"
                                onChangeCapture={handleChange}
                                {...register("vacationUploadedImage")}
                            />
                        </div>
                        <div className="imageContainer">
                            {imageSrc && <img src={imageSrc} />}
                        </div>
                        <div className="button-container">
                            <button>Add Vacation</button>
                        </div>
                    </form>
                </div>
            </div>
            <h1><NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink></h1>
        </div>
    );
}

export default AddVacation;
