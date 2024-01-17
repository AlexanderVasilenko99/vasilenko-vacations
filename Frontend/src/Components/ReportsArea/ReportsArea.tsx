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
import Header from '../Common/header/header';
import UseIsAdmin from '../../Utils/UseIsAdmin';
import { vacationsStore } from '../../Redux/VacationsState';

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
    UseIsAdmin(true, "You must be administrator to view this page!🥴");
    UseTitle("Vasilenko Vacations | Reports");
    let [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        if (labels.length === 0) {
            vacationService.getAllVacations()
                .then(v => {
                    v.forEach(vacation => {
                        labels.push(`${vacation.vacationCountry} - ${vacation.vacationCity}`);
                        followersCount.push(vacation.vacationFollowersCount.toString());
                        csvData.push([`${vacation.vacationCountry} - ${vacation.vacationCity}`,
                        vacation.vacationFollowersCount.toString()])
                    });
                    setVacations(v);
                })
                .catch((err: any) => console.log(err.message));
        }

        // const unsubscribe = vacationsStore.subscribe(() => {
        //     const arr: VacationModel[] = vacationsStore.getState().vacations;
        //     labels = [];
        //     followersCount = [];
        //     csvData = [["vacation destination", "number of followers"]];
        //     arr.forEach(vacation => {
        //         labels.push(`${vacation.vacationCountry} - ${vacation.vacationCity}`);
        //         followersCount.push(vacation.vacationFollowersCount.toString());
        //         csvData.push([`${vacation.vacationCountry} - ${vacation.vacationCity}`,
        //         vacation.vacationFollowersCount.toString()])
        //     })
        //     setVacations(arr);

        // });
        // return unsubscribe;

    }, [vacations]);

    return (
        <div className="ReportsArea">
            <Header {...{ title: "Browse Reports" }} />
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
