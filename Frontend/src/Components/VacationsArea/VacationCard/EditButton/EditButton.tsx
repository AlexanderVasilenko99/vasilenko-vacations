import "./EditButton.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function EditButton(): JSX.Element {
    return (
        <button className="EditButton" onClick={() => console.log("click")}><span>Edit</span><SettingsOutlinedIcon /></button>
    );
}

export default EditButton;
