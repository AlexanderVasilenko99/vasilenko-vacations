import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import noti from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationService";
import useImagePreview from "../../../Utils/UseImagePreview";
import "./AddVacation.css";


function AddProduct(): JSX.Element {
    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.getState().user?.userRoleId !== 1) {
            noti.error("You cant view this page!");
            navigate("/vacations");
        }
    }, []);

    async function send(vacation: VacationModel): Promise<void> {
        try {
            vacation.vacationUploadedImage = (vacation.vacationUploadedImage as unknown as FileList)[0];
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
            <h2>
                Add Vacation
            </h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Vacation Country: </label><input type="text" {...register("vacationCountry")}
                    required placeholder="Israel" minLength={2} maxLength={100} />
                <label>Vacation City: </label><input type="text" {...register("vacationCity")}
                    required placeholder="Ra'anana" minLength={2} maxLength={100} />
                <textarea {...register("vacationDescription")} cols={20} rows={7}
                    required minLength={2} maxLength={100} />
                <label>Start Date: </label><input type="date" {...register("vacationStartDate")}
                    required min={new Date().getTime()} />
                <label>End Date: </label><input type="date" {...register("vacationEndDate")}
                    required min={new Date().getTime()} />

                <label>Price: </label><input type="number" {...register("vacationPrice")}
                    required min={0} max={9999} />

                <label>Vacation image: </label><input type="file" {...register("vacationUploadedImage")}
                    accept="image/*" onChange={handleChange} required />
                <div className="imageContainer">
                    <img src={imageSrc} />
                </div>
                <button>Add Vacation</button>
            </form>
        </div>
    );
}

export default AddProduct;
