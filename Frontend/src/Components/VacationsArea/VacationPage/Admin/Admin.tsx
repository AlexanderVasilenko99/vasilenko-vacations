import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../Models/VacationModel";
import noti from "../../../../Services/NotificationService";
import vacationService from "../../../../Services/VacationService";
import { useEffect, useState } from "react";
import appConfig from "../../../../Utils/AppConfig";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthState";
import { HashLink } from "react-router-hash-link";
import { Autocomplete, TextField } from '@mui/material';
import { iso31661 } from "iso-3166";
import UseIsAdmin from "../../../../Utils/UseIsAdmin";

function Admin(): JSX.Element {
    UseIsAdmin(true, "Only administrators can access this page!", "/vacations");

    const params = useParams();
    const uuid = params.uuid;
    const [imgSrc, setImgSrc] = useState<string>("");
    const [iso, setISO] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [countries, setCountries] = useState<string[]>([]);
    const [country, setCountry] = useState<string>('');
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();

    const [v, setV] = useState<VacationModel>();
    const [minDate, setMinDate] = useState<string>('');

    // const [imageName, setImageName] = useState<string>('');
    // const [imageUrl, setImageUrl] = useState<string>('');


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
                setCountry(vacation.vacationCountry)
                // setImageName(vacation.vacationImageName)
                // setImageUrl("imageUrl", product.imageUrl);


                // setImageName(vacation.vacationImageName)
                // setValue("imageUrl", product.imageUrl);
            })
            .catch((err) => console.log(err));
    }, []);
    // console.log(countries.find(c => c.includes(country)))
    function handleImageChange(e: any) {
        if (e) {
            const file = (e.target.files)[0];
            const url = URL.createObjectURL(file);
            setImgSrc(url);
        }
    }
    function toggleEdit(): void {
        setIsDisabled(!isDisabled);
    }

    async function update(vacation: VacationModel): Promise<void> {
        try {
            vacation.vacationCountryISO = iso;
            vacation.vacationUUID = uuid;
            vacation.vacationImageName = v.vacationImageName;
            vacation.vacationImageUrl = v.vacationImageUrl;

            const countryInput = document.getElementById("countriesAutocomplete") as HTMLInputElement;
            const fullCountry: string = countryInput.value;
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
                    {isDisabled ? "Enable" : "Disable"} Editing
                </button>
            </h1>
            <div className="grid-container">

                <div className="left">
                    <div>
                        <h3>Summary</h3>
                        <ul>
                            <li><HashLink smooth to="#vacation-country">Vacation Country</HashLink></li>
                            <li><HashLink smooth to="#vacation-city">Vacation City</HashLink></li>
                            <li><HashLink smooth to="#vacation-description">Vacation Description</HashLink></li>
                            <li><HashLink smooth to="#vacation-price">Vacation Price</HashLink></li>
                            <li><HashLink smooth to="#vacation-start">Vacation Dates</HashLink></li>
                            <li><HashLink smooth to="#vacation-image">Vacation Image</HashLink></li>
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
                            required minLength={2} maxLength={100} disabled={isDisabled} /> */}

                        {country && iso && <Autocomplete id="countriesAutocomplete"
                            disabled={isDisabled}
                            // {...register("vacationCountry")}
                            defaultValue={country + " " + iso.toUpperCase()}
                            onChange={(event, value: string) => {
                                const countryInput = document.getElementById("countriesAutocomplete") as HTMLInputElement;
                                countryInput.value = value;
                                console.log(countryInput.value);

                                if (value) setISO(value.substring(value.length - 2, value.length).toLowerCase())
                                else setISO("il");
                            }}
                            disablePortal
                            options={countries}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Dates" />} />}

                        <h3 id="vacation-city">Vacation City: </h3>
                        <input type="text" {...register("vacationCity")}
                            required minLength={2} maxLength={100} disabled={isDisabled} />

                        <h3 id="vacation-description">Vacation Description: </h3>
                        <textarea {...register("vacationDescription")} rows={3}
                            required minLength={2} maxLength={100} disabled={isDisabled} />

                        <h3 id="vacation-price">Vacation Price: </h3>
                        <input type="number"{...register("vacationPrice")}
                            required min={0} max={9999} disabled={isDisabled} />

                        <div className="dates-container">
                            <div className="startDate">
                                <h3 id="vacation-start">Vacation Start Date: </h3>
                                <input type="date"
                                    {...register("vacationStartDate")}
                                    required disabled={isDisabled}
                                    onChange={(e) => { setMinDate(e.target.value) }} />
                            </div>
                            <div className="endDate">
                                <h3>Vacation End Date: </h3>
                                <input type="date"
                                    {...register("vacationEndDate")}
                                    required disabled={isDisabled} min={minDate} />
                            </div>
                        </div>
                        <div className="image-section-container">
                            <h3 id="vacation-image">Vacation image: </h3>
                            <input type="file" accept="image/*"
                                className="imageInput" disabled={isDisabled}
                                onChange={handleImageChange}
                                {...register("vacationUploadedImage")} />
                        </div>
                        <div className="imageContainer">
                            <img src={imgSrc} />
                        </div>
                        <div className="button-container">
                            <button disabled={isDisabled}>Update Vacation</button>
                        </div>
                    </form>
                </div>
            </div>
            <h1><NavLink to={appConfig.vacationsRoute}>Back To All Vacations</NavLink></h1>
        </div>
    );
}

export default Admin;
