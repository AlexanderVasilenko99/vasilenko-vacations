import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import VacationModel from "../../../../Models/VacationModel";
import UseDeleteVacation from "../../../../Utils/UseDeleteVacation";
import "./DeleteButton.css";

function DeleteButton(vacation: VacationModel): JSX.Element {
    return (
        <button className="DeleteButton" onClick={() => UseDeleteVacation(vacation)}><ClearOutlinedIcon />
            <span>Delete</span></button>
    );
}

export default DeleteButton;
