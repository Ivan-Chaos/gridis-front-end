import CitiesTable from '../AdminMainPage/components/CitiesTable/CitiesTable';
import ManufacturersTable from '../AdminMainPage/components/ManufacturersTable/Manufacturers';
import classes from './CitiesListing.module.scss';
import ServicesTable from './components/ServicesTable/ServicesTable';

import {getAllServices} from '../../API/service'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const ServicesListing = () => {

    const [labels, setLabels] = useState([]);
    const [numberData, setNumberData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);

    

    const data = {
        labels,
        datasets: [
            {
                label: 'Кількість запитів на сервіс у %',
                data: numberData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Загалний дохід з сервісу у %:',
                data: revenueData,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Статистика запитів на надання сервісу',
          },
        },
      };

    useEffect(()=>{
        getAllServices().then(response=>{
            const totalRequests = response.data.map(service=>service.serviceRequests.length).reduce((partialSum, a)=>partialSum+a, 0) /100;
            const totalRevenue = response.data.map(service=>service.serviceRequests.length*service.cost).reduce((partialSum, a)=>partialSum+a, 0) /100;

            setNumberData(response.data.map(service=>service.serviceRequests.length/totalRequests));
            setRevenueData(response.data.map(service=>service.serviceRequests.length*service.cost/totalRevenue));
            setLabels(response.data.map(s=>s.serviceName));
        })
    }, []);

    return (<div className={classes.CitiesListing}>
        <header>
            <h1>Керування послугами</h1>
            <h2>Тут ви можете додавати та редагувати інформацію про послуги</h2>
        </header>
        <main>
            <ServicesTable />
            <Bar options={options} data={data} />;
        </main>
    </div>);
}

export default ServicesListing;