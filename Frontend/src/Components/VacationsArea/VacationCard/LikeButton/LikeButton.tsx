import "./LikeButton.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

class LikeButtonModel {
    public isFollowing: number;
}

function LikeButton(btn: LikeButtonModel): JSX.Element {
    return (
        <button className="LikeButton" onClick={() => console.log("click")}>
            <span>Like</span>{btn.isFollowing ? <FavoriteIcon /> : <FavoriteBorderIcon />}</button>
    );
}

export default LikeButton;
