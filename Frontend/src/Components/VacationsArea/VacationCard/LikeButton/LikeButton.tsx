import "./LikeButton.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

class LikeButtonModel {
    public isFollowing: number;
    public onClickFunction?: (userUUID: string, vacatoinUUID: string) => {};
}

function LikeButton(btn: LikeButtonModel): JSX.Element {
    return (
        <button className="LikeButton" onClick={() => console.log("click")}>
            {btn.isFollowing ? <><span>Unlike</span><FavoriteIcon /></> : <><span>Like</span><FavoriteBorderIcon /></>}
        </button>
    );
}

export default LikeButton;
