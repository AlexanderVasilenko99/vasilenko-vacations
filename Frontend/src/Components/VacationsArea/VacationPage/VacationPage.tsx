import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import vacationService from "../../../Services/VacationService";
import UseTitle from "../../../Utils/UseTitle";
import EditVacation from "../EditVacation/EditVacation";
import "./VacationPage.css";
import { useForm } from "react-hook-form";
import noti from "../../../Services/NotificationService";

function VacationPage(): JSX.Element {
    UseTitle(`Vasilenko Vacations | Vacations`);
    const params = useParams();
    const uuid = params.uuid;

    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();



    // const [imgSrc, setImgSrc] = useState<string>(`${appConfig.productsUrl}/images/${id}.jpg`);
    useEffect(() => {
        vacationService.getOneVacation(uuid)
            .then(vacation => {
                // console.log(vacation);

                setValue("vacationCity", vacation.vacationCity);
                setValue("vacationCountry", vacation.vacationCountry);
                setValue("vacationDescription", vacation.vacationDescription);
                setValue("vacationPrice", vacation.vacationPrice);
                // setValue("vacationStartDate", sDay);
                // setValue("vacationEndDate", vacation.vacationEndDate);

                // setValue("stock", product.stock);
                // setValue("imageUrl", product.imageUrl);
                // setImgSrc(appConfig.productsUrl + `images/${product.imageUrl}`)
                // console.log(vacation);

            })
            .catch((err) => console.log(err));
    }, []);


    function handleChange(e: any) {
        if (e) {
            const file = (e.target.files)[0];
            const url = URL.createObjectURL(file);
            // setImgSrc(url);
        }
    }

    async function update(vacation: VacationModel): Promise<void> {
        try {
            vacation.vacationUploadedImage = (vacation.vacationUploadedImage as unknown as FileList)[0];
            vacation.vacationUUID = uuid;
            noti.success("The vacation has been updated successfully!");
            await vacationService.updateVacation(vacation);

        } catch (err: any) {
            console.log(err);
        }
    }


    return (
        <div className="VacationPage">
            {/* <div className="EditVacation"> */}

            <form onSubmit={handleSubmit(update)}>
                <label>Vacation Country: </label><input type="text" {...register("vacationCountry")} required />
                <label>Vacation City: </label><input type="text" {...register("vacationCity")} required />
                <label>Vacation Description: </label><input type="text" {...register("vacationDescription")} required />
                <label>Vacation Price: </label><input type="number" {...register("vacationPrice")} required />
                <label>Vacation Start Date: </label><input type="date" {...register("vacationStartDate")} required />
                <label>Vacation End Date: </label><input type="date" {...register("vacationEndDate")} required />

                {/* <label>Product image: </label><input type="file" {...register("image")} accept="image/*" onChange={handleChange} /> */}
                <div className="imageContainer">
                    {/* <img src={imgSrc} /> */}
                </div>
                {authStore.getState().user?.userRoleId === 1 && <button>Update Vacation</button>}
            </form>
        </div>
    );
}

export default VacationPage;
