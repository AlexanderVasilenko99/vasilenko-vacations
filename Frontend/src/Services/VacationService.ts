import axios from "axios";
import StatusCode from "../Models/StatusCodes";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import { VacationsActionTypes, VacationsActions, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";
import notificationService from "./NotificationService";

class VacationService {
    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {
            const userUUID = authStore.getState().user?.userUUID;
            if (!userUUID) throw new Error("No user uuid was provided");

            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + userUUID);
            vacations = response.data;
            vacations.map((v) => { v.vacationImageUrl = appConfig.vacationsImageUrl + v.vacationImageName })

            const action: VacationsActions = { type: VacationsActionTypes.SetVacations, payload: vacations }
            vacationsStore.dispatch(action);
        }
        return vacations;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const options = { headers: { "Content-Type": "multipart/form-data" } }
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);
        const addedVacation = response.data;

        addedVacation.vacationIsFollowing = 0;
        addedVacation.vacationFollowersCount = 0;

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
                notificationService.success("This vacation has been added to your followed vacations!");
                const action: VacationsActions = { type: VacationsActionTypes.FollowVacation, payload: vacationUUID }
                vacationsStore.dispatch(action);
            }
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    public async unfollowVacation(userUUID: string, vacationUUID: string): Promise<void> {
        try {
            const response = await axios.delete(appConfig.vacationsUnfollowUrl + userUUID + "/" + vacationUUID);
            if (response.status === StatusCode.NoContent) {
                notificationService.success("This vacation has been successfully unfollowed");
                const action: VacationsActions = { type: VacationsActionTypes.UnfollowVacation, payload: vacationUUID }
                vacationsStore.dispatch(action);
            }
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    public async getOneVacation(vacationUUID: string): Promise<VacationModel> {
        try {
            let vacations = vacationsStore.getState().vacations;
            if (vacations.length === 0) {
                vacations = await this.getAllVacations();
                const action: VacationsActions = { type: VacationsActionTypes.SetVacations, payload: vacations }
                vacationsStore.dispatch(action);
            }
            const index = vacations.findIndex(v => v.vacationUUID === vacationUUID);
            return vacations[index];
        } catch (err: any) {
            notificationService.error(err)
        }
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const options = { headers: { "Content-Type": "multipart/form-data" } }
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationUUID, vacation, options);
        const updatedVacation: VacationModel = response.data;

        const action = { type: VacationsActionTypes.UpdateVacation, payload: updatedVacation }
        vacationsStore.dispatch(action);
        return updatedVacation;
    }
}
const vacationService = new VacationService();
export default vacationService;