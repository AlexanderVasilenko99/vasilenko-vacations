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
            // const idForDelete = newState.vacations.findIndex(v => v.vacationUUID === action.payload);
            // console.log("idForDelete: " + idForDelete);
            // newState.vacations.splice(idForDelete, 1); //Doesn't work (idk why)
            // newState.vacations = newState.vacations.splice(idForDelete, 1); //Returns only deleted item (idk why)

            newState.vacations = newState.vacations.filter(v => v.vacationUUID !== action.payload); // works like a charm 
            break;
        case VacationsActionTypes.UpdateVacation:
            const idForUpdate = newState.vacations.findIndex(v => v.vacationUUID === action.payload);
            newState.vacations.splice(idForUpdate, 1, action.payload);
            break;
        case VacationsActionTypes.ClearAll:
            newState.vacations = [];
            break;
    }
    return newState;
}

export const vacationsStore = createStore(vacationsReducer);
