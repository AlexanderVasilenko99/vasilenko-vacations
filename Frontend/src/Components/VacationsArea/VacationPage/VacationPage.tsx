import { useParams } from "react-router-dom";
import "./VacationPage.css";
import { useEffect } from "react";

function VacationPage(): JSX.Element {
    const params = useParams();
    const uuid = params.uuid;
    return (
        <div className="VacationPage">
            vacation {uuid} ()
        </div>
    );
}

export default VacationPage;
