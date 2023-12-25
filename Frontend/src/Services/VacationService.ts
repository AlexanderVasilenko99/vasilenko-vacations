import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionTypes, VacationsActions, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";
import noti from "./NotificationService";
import StatusCode from "../Models/status-codes";

class VacationService {
    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {
            const userUUID = authStore.getState().user.userUUID;

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
        if (vacations.length === 0) vacations = await this.getAllVacations();

        const vacation = vacations.find(v => v.vacationUUID === uuid);
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const options = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);
        const addedVacation = response.data;
        const action: VacationsActions = { type: VacationsActionTypes.AddVacation, payload: addedVacation }
        vacationsStore.dispatch(action);
        return addedVacation;
    }

    public async deleteVacation(vacationUUID: string): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + vacationUUID);
        const action: VacationsActions = { type: VacationsActionTypes.DeleteVacation, payload: vacationUUID }
        vacationsStore.dispatch(action);
    }

    public async followVacation(userUUID: string, vacationUUID: string): Promise<void> {
        try {
            const response = await axios.post(appConfig.vacationsFollowUrl + userUUID + "/" + vacationUUID);
            if (response.status === StatusCode.Created) {
                noti.success("This vacation has been added to your followed vacations!");
            }
        } catch (err: any) {
            noti.error(err);
        }
    }
    public async unfollowVacation(userUUID: string, vacationUUID: string): Promise<void> {
        try {
            const response = await axios.delete(appConfig.vacationsUnfollowUrl + userUUID + "/" + vacationUUID);
            if (response.status === StatusCode.NoContent) {
                noti.success("This vacation has been  successfully unfollowed");
            }
        } catch (err: any) {
            noti.error(err);
        }
    }

    // public async getOneVacation(vacationUUID: string): Promise<VacationModel> {
    //     const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationUUID)
    //     const vacation = response.data;
    //     return vacation;
    // }



    // public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

    //     const options = {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     }
    //     const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationUUID, vacation, options);
    //     const updatedVacation = response.data;

    //     const action = {type: VacationActionTypes.UpdateVacation, payload:updatedVacation}
    //     vacationsStore.dispatch(action);

    //     return updatedVacation;
    // }



}
const vacationService = new VacationService();
export default vacationService;