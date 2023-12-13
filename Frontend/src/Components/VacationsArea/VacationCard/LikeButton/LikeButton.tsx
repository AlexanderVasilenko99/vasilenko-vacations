import "./LikeButton.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function LikeButton(): JSX.Element {
    return (
        <button className="LikeButton" onClick={() => console.log("click")}><span>Like</span><FavoriteBorderIcon /></button>
    );
}

export default LikeButton;
