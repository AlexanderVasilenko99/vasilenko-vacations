import { useParams } from "react-router-dom";
import "./UserArea.css";
import { useEffect } from "react";
import UseTitle from "../../Utils/UseTitle";
import Header from "../Common/header/header";

function UserArea(): JSX.Element {
    const params = useParams();
    const uuid = params.uuid;
    UseTitle(`Vasilenko Vacations | ${uuid}`);

    useEffect(() => {
        // ADD FRONT AND BACK SERVICES TO GET SINGLE USER FROM HIS UUID
    }, []);

    return (
        <div className="UserArea">
            <Header {...{ title: `Hi ${params.uuid}!` }} />
        </div>
    );
}

export default UserArea;
