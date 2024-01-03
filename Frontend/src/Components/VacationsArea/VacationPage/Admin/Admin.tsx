import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../Models/VacationModel";
import noti from "../../../../Services/NotificationService";
import vacationService from "../../../../Services/VacationService";
import { useEffect, useState } from "react";
import appConfig from "../../../../Utils/AppConfig";

function Admin(): JSX.Element {
    const params = useParams();
    const uuid = params.uuid;
    const [imgSrc, setImgSrc] = useState<string>("");
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    useEffect(() => {
        vacationService.getOneVacation(uuid)
            .then(vacation => {
                setValue("vacationCity", vacation.vacationCity);
                setValue("vacationCountry", vacation.vacationCountry);
                setValue("vacationDescription", vacation.vacationDescription);
                setValue("vacationPrice", vacation.vacationPrice);
                // setValue("vacationStartDate", sDay);
                // setValue("vacationEndDate", vacation.vacationEndDate);

                // setValue("stock", product.stock);
                // setValue("imageUrl", product.imageUrl);
                setImgSrc(vacation.vacationImageUrl)
                // console.log(vacation);

            })
            .catch((err) => console.log(err));
    }, []);
    function handleImageChange(e: any) {
        if (e) {
            const file = (e.target.files)[0];
            const url = URL.createObjectURL(file);
            setImgSrc(url);
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
        <div className="Admin">
            admin
            <form onSubmit={handleSubmit(update)}>
                <label>Vacation Country: </label><input type="text" {...register("vacationCountry")}
                    required minLength={2} maxLength={100} />
                <label>Vacation City: </label><input type="text" {...register("vacationCity")}
                    required minLength={2} maxLength={100} />
                <textarea {...register("vacationDescription")} cols={20} rows={7}
                    required minLength={2} maxLength={100} />
                <label>Vacation Price: </label><input type="number" {...register("vacationPrice")}
                    required min={0} max={9999} />

                <label>Vacation Start Date: </label><input type="date" {...register("vacationStartDate")} required />
                <label>Vacation End Date: </label><input type="date" {...register("vacationEndDate")} required />

                <label>Vacation image: </label><input type="file" {...register("vacationUploadedImage")}
                    accept="image/*" onChange={handleImageChange} />
                <div className="imageContainer">
                    <img src={imgSrc} />
                </div>
                <button>Update Vacation</button>
            </form>
        </div>
    );
}

export default Admin;
