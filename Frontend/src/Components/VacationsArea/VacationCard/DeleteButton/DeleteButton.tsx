import { useEffect } from "react";
import "./DeleteButton.css";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import vacationService from "../../../../Services/VacationService";
import noti from "../../../../Services/NotificationService";
import VacationModel from "../../../../Models/VacationModel";

function DeleteButton(vacation: VacationModel): JSX.Element {

    async function deleteVacation(vacationUUID: string) {
        try {
            if (window.confirm(`Are you absolutely sure you want to delete the
             ${vacation.vacationCountry} - ${vacation.vacationCity} vacation?`)) {
                await vacationService.deleteVacation(vacationUUID);
                noti.success("Vacation Has been deleted successfully");
            }
        } catch (err: any) {
            noti.error(err)
        }
    }

    return (
        <button className="DeleteButton" onClick={() => deleteVacation(vacation.vacationUUID)}><ClearOutlinedIcon />
            <span>Delete</span></button>
    );
}

export default DeleteButton;
