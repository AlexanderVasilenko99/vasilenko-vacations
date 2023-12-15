import "./DeleteButton.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

function DeleteButton(): JSX.Element {
    return (
        <button className="DeleteButton" onClick={() => console.log("click")}><ClearOutlinedIcon /><span>Delete</span></button>
    );
}

export default DeleteButton;
