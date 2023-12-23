import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionTypes, VacationsActions, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";

class VacationService {
    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0) {
            const userUUID = authStore.getState().user.userUUID;
            console.log(userUUID);

            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + userUUID);
            vacations = response.data;
            vacations.map((v) => { v.vacationImageUrl = appConfig.vacationsImageUrl + v.vacationImageName })

            const action: VacationsActions = { type: VacationsActionTypes.SetVacations, payload: vacations }
            vacationsStore.dispatch(action);
        }
        return vacations;
    }
    public async getVacationByUUID(uuid: string): Promise<VacationModel> {
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0) {
            vacations = await this.getAllVacations();
        }
        const vacation = vacations.find(v => v.vacationUUID === uuid);
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const options = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios.post<VacationModel>(appConfig.productsUrl, vacation, options);
        const addedVacation = response.data;
        const action: VacationsActions = { type: VacationsActionTypes.AddVacation, payload: addedVacation }
        vacationsStore.dispatch(action);
        return addedVacation;
    }


    // public async getOneProduct(prodId: number): Promise<ProductModel> {
    //     const response = await axios.get(appConfig.productsUrl + prodId)
    //     const product = response.data;
    //     return product;
    // }



    // public async updateProduct(product: ProductModel): Promise<ProductModel> {

    //     const options = {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     }
    //     const response = await axios.put(appConfig.productsUrl + product.id, product, options);
    //     const updateProduct = response.data;

    //     const action = {type: ProductsActionTypes.UpdateProduct, payload:updateProduct}
    //     productsStore.dispatch(action);

    //     return updateProduct;
    // }

    // public async deleteProduct(prodId: number): Promise<void> {
    //     await axios.delete(appConfig.productsUrl + prodId);

    //     const action: ProductsActions = { type: ProductsActionTypes.DeleteProduct, payload: prodId }
    //     productsStore.dispatch(action);
    // }


}
const vacationService = new VacationService();
export default vacationService;