import { useParams } from "react-router-dom";
import "./UserArea.css";
import { useEffect } from "react";
import UseTitle from "../../Utils/UseTitle";

function UserArea(): JSX.Element {
    const params = useParams();
    const uuid = params.uuid;
    UseTitle(`Vasilenko Vacations | ${uuid}`);

    useEffect(() => {
        // ADD FRONT AND BACK SERVICES TO GET SINGLE USER FROM HIS UUID
    }, []);

    return (
        <div className="UserArea">
            <h1>User Area of user: {params.uuid}</h1>
        </div>
    );
}

export default UserArea;
