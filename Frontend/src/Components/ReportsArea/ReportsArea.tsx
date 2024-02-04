import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, } from 'chart.js';
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { CSVLink } from "react-csv";
import VacationModel from "../../Models/VacationModel";
import { vacationsStore } from '../../Redux/VacationsState';
import vacationService from "../../Services/VacationService";
import UseIsAdmin from '../../Utils/UseIsAdmin';
import UseTitle from "../../Utils/UseTitle";
import "./ReportsArea.css";

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
let csvData = [["vacation destination", "number of followers"]];

function ReportsArea(): JSX.Element {
    UseIsAdmin(true, "You must be administrator to view this page!🥴");
    UseTitle("Vasilenko Vacations | Reports");
    let [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        if (labels.length === 0 || vacationsStore.getState().vacations.length !== labels.length) {
            labels = [];
            followersCount = [];
            csvData = [["vacation destination", "number of followers"]];

            vacationService.getAllVacations()
                .then(v => {
                    v.forEach(vacation => {
                        labels.push(`${vacation.vacationCountry} - ${vacation.vacationCity}`);
                        followersCount.push(vacation.vacationFollowersCount?.toString());
                        csvData.push([`${vacation.vacationCountry} - ${vacation.vacationCity}`,
                        vacation.vacationFollowersCount?.toString()])
                    });
                    setVacations(v);
                })
                .catch((err: any) => console.log(err.message));
        }
    }, [vacations]);

    return (
        <div className="ReportsArea">
            <div className='headers-container'>
                <h1>Browse Reports</h1>
                <CSVLink data={csvData}>Download csv</CSVLink>
            </div>
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
                        backgroundColor: '#2e6ba0',
                    }],
                }} />
            </div>


        </div>
    );
}
export default ReportsArea;
