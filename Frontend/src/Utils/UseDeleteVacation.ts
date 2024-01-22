import VacationModel from "../Models/VacationModel";
import noti from "../Services/NotificationService";
import vacationService from "../Services/VacationService";


async function deleteVacation(vacation: VacationModel) {
    try {
        if (window.confirm(`Are you absolutely sure you want to delete the
             ${vacation.vacationCountry} - ${vacation.vacationCity} vacation?`)) {
            await vacationService.deleteVacation(vacation.vacationUUID);
            noti.success("Vacation Has been deleted successfully");
        }
    } catch (err: any) {
        noti.error(err)
    }
}
export default deleteVacation;