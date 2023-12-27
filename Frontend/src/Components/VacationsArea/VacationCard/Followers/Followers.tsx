import VacationModel from "../../../../Models/VacationModel";
import "./Followers.css";


function Followers(vacation: VacationModel): JSX.Element {
    return (
        <div className='Followers'>
            {vacation.vacationFollowersCount > 0 && <span>{vacation.vacationFollowersCount} People are following this vacation!</span>}
            {vacation.vacationFollowersCount === 0 && <span>Be the first to follow this vacation!</span>}
        </div>
    );
}

export default Followers;
