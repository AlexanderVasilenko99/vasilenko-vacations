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

async function handleClick(props: LikeButtonModel): Promise<void> {
    if (props.isFollowing) await vacationService.unfollowVacation(props.userUUID, props.vacationUUID);
    else await vacationService.followVacation(props.userUUID, props.vacationUUID);
}

function LikeButton(props: LikeButtonModel): JSX.Element {
    return (
        <button className="LikeButton" onClick={() => { handleClick(props) }}>
            {props.isFollowing ? <><span>Unlike</span><FavoriteIcon /></> :
                <><span>Like</span><FavoriteBorderIcon /></>}
        </button>
    );
}

export default LikeButton;
