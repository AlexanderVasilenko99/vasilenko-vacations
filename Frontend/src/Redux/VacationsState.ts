import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";
import VacationModel from "../Models/VacationModel";

// 1. Products state object -> class component
// products: ProductModel[]

// 2. enum -> ProductsActionTypes
// ProductsActionTypes = "setProducts", "addProduct", "editProduct", "deleteProduct"

// 3. interface -> ProductActions - {type,data}

// 4. switch function -> will perform action by chosen type - "reducer"

// 5. store - create -> pass the reducer 


// 1.
export class VacationState {
    vacations: VacationModel[] = [];
    // best selling product, last updated, most recent addition... 
}

// 2.
export enum VacationsActionTypes {
    SetVacations = "SetVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    ClearAll = "ClearAll"
}

// 3.
export interface VacationsActions {
    type: VacationsActionTypes,
    payload?: any
}

// 4.
function vacationsReducer(currentState = new VacationState(), action: VacationsActions): VacationState {
    const newState = { ...currentState };
    switch (action.type) {
        case VacationsActionTypes.SetVacations:
            newState.vacations = action.payload;
            break;
        case VacationsActionTypes.AddVacation:
            newState.vacations.push(action.payload);
            break;
        case VacationsActionTypes.UpdateVacation:
            const idForDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations.splice(idForDelete, 1);
            break;
        case VacationsActionTypes.DeleteVacation:
            const idForUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.id);
            newState.vacations.splice(idForUpdate, 1, action.payload);
            break;
        case VacationsActionTypes.ClearAll:
            newState.vacations = [];
            break;
    }
    return newState;
}

// 5.
export const vacationsStore = createStore(vacationsReducer);

// const productState = new ProductsState();
// export default productState;