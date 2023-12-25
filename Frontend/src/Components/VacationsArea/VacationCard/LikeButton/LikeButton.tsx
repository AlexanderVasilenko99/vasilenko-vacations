import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import vacationService from "../../../../Services/VacationService";
import "./LikeButton.css";

export class LikeButtonModel {
    public isFollowing: number;
    public userUUID: string;
    public vacationUUID: string;
    // public onClickFunction?: (userUUID: string, vacatoinUUID: string) => {};
}

function LikeButton(props: LikeButtonModel): JSX.Element {
    return (
        <button className="LikeButton" onClick={() => {
            if (props.isFollowing) vacationService.unfollowVacation(props.userUUID, props.vacationUUID);
            else vacationService.followVacation(props.userUUID, props.vacationUUID);
        }}>
            {props.isFollowing ? <><span>Unlike</span><FavoriteIcon /></> :
                <><span>Like</span><FavoriteBorderIcon /></>}
        </button>
    );
}

export default LikeButton;
