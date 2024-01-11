import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import VacationModel from "../../Models/VacationModel";
import { authStore } from "../../Redux/AuthState";
import noti from "../../Services/NotificationService";
import vacationService from "../../Services/VacationService";
import UseTitle from "../../Utils/UseTitle";
import "./ReportsArea.css";
import { CSVLink, CSVDownload } from "react-csv";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

let labels: string[] = [];
let followersCount: string[] = [];
let x: VacationModel[] = [];
let csvData = [["vacation destination", "number of followers"]];

function ReportsArea(): JSX.Element {
    const navigate = useNavigate();
    let [vacations, setVacations] = useState<VacationModel[]>([]);
    UseTitle("Vasilenko Vacations | Reports");

    useEffect(() => {
        const token = authStore.getState().token;
        const roleId = authStore.getState().user?.userRoleId;
        if (!token || !roleId) {
            noti.error("Please login in to view this page");
            navigate("/login");
            return;
        }
        if (roleId === 2) {
            noti.error("You are unauthorized to view this page");
            navigate("/home");
            return;
        }
        else if (labels.length === 0) {
            vacationService.getAllVacations()
                .then(v => {
                    v.forEach(vacation => {
                        labels.push(`${vacation.vacationCountry} - ${vacation.vacationCity}`);
                        followersCount.push(vacation.vacationFollowersCount.toString());
                        csvData.push([`${vacation.vacationCountry} - ${vacation.vacationCity}`,
                        vacation.vacationFollowersCount.toString()])
                        setVacations(v);
                    });
                })
                .catch((err: any) => console.log(err.message));
        }
    }, [vacations]);

    return (
        <div className="ReportsArea">
            <div className="canvas-container">
                <Bar options={{
                    responsive: true,
                    plugins: { legend: { position: 'top' as const } }
                }
                } data={{
                    labels,
                    datasets: [{
                        label: 'Followers',
                        data: followersCount,
                        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                        backgroundColor: '#2e6ba0',
                    }],
                }} />
            </div>


            <CSVLink data={csvData}>Download csv</CSVLink>
        </div>
    );
}
export default ReportsArea;
