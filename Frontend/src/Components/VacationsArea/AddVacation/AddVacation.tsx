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
    const { register, handleSubmit } = useForm<ProductModel>();
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
        console.log(files);
        if (!files || !files.item(0)) return;

        setImageFile(files.item(0));
    }

    return (
        <div className="AddVacation">
            <h2>
                Add Vacation
            </h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Product name: </label><input type="text" {...register("name")} required placeholder="Chef Alexander's Pineapple Pizza" />
                <label>Product price: </label><input type="number" {...register("price")} required step="0.01" placeholder="69" />
                <label>Product stock: </label><input type="number" {...register("stock")} required placeholder="420" />

                <label>Product image: </label><input type="file" {...register("image")} accept="image/*" onChange={handleChange} />
                <div className="imageContainer">
                    <img src={imageSrc} />
                </div>
                <button>Add product</button>
            </form>
        </div>
    );
}

export default AddProduct;
