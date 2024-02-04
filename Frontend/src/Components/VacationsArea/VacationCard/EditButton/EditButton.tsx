import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import appConfig from "../../../../Utils/AppConfig";
import "./EditButton.css";

function EditButton(vacation: VacationModel): JSX.Element {
    const navigate = useNavigate();
    return (
        <button className="EditButton" onClick={() => navigate(appConfig.vacationsRoute + vacation.vacationUUID)}><span>Edit</span><SettingsOutlinedIcon /></button>
    );
}

export default EditButton;
