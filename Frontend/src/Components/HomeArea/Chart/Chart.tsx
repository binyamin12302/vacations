import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import VacationModel from '../../../Models/VacationModel';
import store from "../../../Redux/Store";
import { fetchVacationsAction } from '../../../Redux/VacationsState';
import vacationsService from '../../../Services/VacationsService';


function Chart(): JSX.Element {

    const [vacations, setVacation] = useState<VacationModel[]>([]);

    useEffect(() => {

        vacationsService.getAllVacations()
            .then(vacation => console.log(vacation))
            .catch(err => console.log(err.message));

        setVacation(store.getState().vacationsState.vacations);

        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().vacationsState.vacations];

            vacationsService.getAllVacations()
                .then(vacation => console.log(vacation))
                .catch(err => console.log(err.message));

            setVacation(dup);
        });


        return () => {
            unsubscribe();
        };

    }, [])


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };


    const obj = vacations.filter((v) => v.followers > 0)


    const labels = obj.map((v) => v.destination);



    const data = {
        labels,
        datasets: [
            {
                label: "Followers",
                data: obj.map((v) => v.followers),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <Container className="Chart ">
            <Bar options={options} data={data} />
        </Container>
    );
}

export default Chart;


