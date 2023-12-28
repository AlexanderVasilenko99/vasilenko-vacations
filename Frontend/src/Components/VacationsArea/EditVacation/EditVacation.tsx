import { useForm } from "react-hook-form";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";

import { useNavigate, useParams } from "react-router-dom";

import "./EditVacation.css";
import { useEffect, useState } from "react";
import NotificationService from "../../../Services/NotificationService";
import useImagePreview from "../../../Utils/UseImagePreview";
import appConfig from "../../../Utils/AppConfig";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationService";



function EditVacation(): JSX.Element {

    const params = useParams();
    const vacationUUID = params.vacationUUID;

    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();



    // const [imgSrc, setImgSrc] = useState<string>(`${appConfig.productsUrl}/images/${id}.jpg`);
    useEffect(() => {
        vacationService.getOneVacation(vacationUUID)
            .then(vacation => {
                console.log(vacation);
                
                setValue("vacationCity", vacation.vacationCity);
                setValue("vacationCountry", vacation.vacationCountry);
                setValue("vacationDescription", vacation.vacationDescription);
                setValue("vacationPrice", vacation.vacationPrice);
                // setValue("stock", product.stock);
                // setValue("imageUrl", product.imageUrl);
                // setImgSrc(appConfig.productsUrl + `images/${product.imageUrl}`)
                console.log(vacation);

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

    async function update(product: ProductModel): Promise<void> {
        try {
            product.image = (product.image as unknown as FileList)[0];
            // product.id = id;
            NotificationService.success("product updated  successfully");
            const beProduct = await productsService.updateProduct(product);
            navigate("/products/product/" + beProduct.id);

        } catch (err: any) {
            console.log(err);
        }
    }


    return (
        <div className="EditVacation">
            <h2>
                Edit Vacation
            </h2>
            <form onSubmit={handleSubmit(update)}>
                <label>Vacation Country: </label><input type="text" {...register("vacationCountry")} required />
                <label>Vacation City: </label><input type="text" {...register("vacationCity")} required />
                <label>Vacation Description: </label><input type="text" {...register("vacationDescription")} required />
                <label>Vacation Price: </label><input type="number" {...register("vacationPrice")} required />

                {/* <label>Product image: </label><input type="file" {...register("image")} accept="image/*" onChange={handleChange} /> */}
                <div className="imageContainer">
                    {/* <img src={imgSrc} /> */}
                </div>
                <button>Update Vacation</button>
            </form>
        </div>
    );
}

export default EditVacation;
