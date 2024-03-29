import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class VacationState {
    vacations: VacationModel[] = [];
}

export enum VacationsActionTypes {
    SetVacations = "SetVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    FollowVacation = "FollowVacation",
    UnfollowVacation = "UnfollowVacation",
    ClearAll = "ClearAll"
}

export interface VacationsActions {
    type: VacationsActionTypes,
    payload?: any
}

function vacationsReducer(currentState = new VacationState(), action: VacationsActions): VacationState {
    const newState = { ...currentState };
    switch (action.type) {
        case VacationsActionTypes.SetVacations:
            newState.vacations = action.payload;
            break;
        case VacationsActionTypes.AddVacation:
            newState.vacations.push(action.payload);
            break;
        case VacationsActionTypes.DeleteVacation:
            newState.vacations = newState.vacations.filter(v => v.vacationUUID !== action.payload);
            break;
        case VacationsActionTypes.UpdateVacation:
            const vacation: VacationModel = action.payload;
            const idForUpdate = newState.vacations.findIndex(v => v.vacationUUID === vacation.vacationUUID);
            newState.vacations.splice(idForUpdate, 1, vacation);
            break;
        case VacationsActionTypes.FollowVacation:
            const idForFollow = newState.vacations.findIndex(v => v.vacationUUID === action.payload);
            newState.vacations[idForFollow].vacationFollowersCount += 1;
            newState.vacations[idForFollow].vacationIsFollowing = 1;
            break;
        case VacationsActionTypes.UnfollowVacation:
            const idForUnfollow = newState.vacations.findIndex(v => v.vacationUUID === action.payload);
            const unfollowedVacation: VacationModel = newState.vacations[idForUnfollow];
            unfollowedVacation.vacationFollowersCount -= 1;
            newState.vacations[idForUnfollow].vacationIsFollowing = 0;
            break;
        case VacationsActionTypes.ClearAll:
            newState.vacations = [];
            break;
    }
    return newState;
}

export const vacationsStore = createStore(vacationsReducer);
