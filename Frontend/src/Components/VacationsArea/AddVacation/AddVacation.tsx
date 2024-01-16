import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import noti from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationService";
import useImagePreview from "../../../Utils/UseImagePreview";
import UseIsAdmin from "../../../Utils/UseIsAdmin";
import "./AddVacation.css";
import { iso31661 } from "iso-3166";


function AddVacation(): JSX.Element {
    UseIsAdmin(true, "Only administrators can access this page!", "/vacations");
    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState<string>('');
    useEffect(() => {
        console.log(iso31661);
    }, [])
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
                    required min={new Date().toJSON().slice(0, 10)}
                    onChange={(e) => { setMinDate(e.target.value) }} />

                <label>End Date: </label><input type="date" {...register("vacationEndDate")}
                    required min={minDate} />

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

export default AddVacation;
