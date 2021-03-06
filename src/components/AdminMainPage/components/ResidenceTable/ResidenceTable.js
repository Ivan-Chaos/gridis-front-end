import { useEffect, useState, forwardRef } from 'react';
import { addResidence, deleteResidence, getAllResidences, putResidence } from '../../../../API/residence';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import { getAllPeople } from '../../../../API/people';
import { getAllInstalledMeters } from '../../../../API/installedMeter';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ResidenceTable = ({ addressID }) => {
    const [allPeople, setAllPeople] = useState({});

    const [allMeters, setAllMeters] = useState({});

    useEffect(() => {
        getAllPeople().then(response => {
            setAllPeople(response.data.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.firstName + " " + cur.lastName;
                return acc;
            }, {}));
        });

        getAllInstalledMeters().then(response => {
            setAllMeters(response.data.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.serialNumber;
                return acc;
            }, {}));
        })
    }, [])

    return (<div>
        <MaterialTable
            title="??????????"
            icons={tableIcons}

            options={{
                paging: false
            }}
            columns={[
                { title: '??????\'??????', field: 'entranceNumber', type: 'numeric' },
                { title: '?????????? ????????????????', field: 'apartmentNumber', type: 'numeric' },
                { title: '????????????', field: 'floorNumber', type: 'numeric' },
                { title: '????????????', field: 'size', type: 'numeric' },
                { title: '????????????', field: 'residentId', lookup: allPeople },
                { title: '???????????????????????? ??????????????????', field: 'installedMeterId', lookup: allMeters },
            ]}
            data={query => new Promise((resolve, reject) => {
                getAllResidences().then((response) => {
                    resolve({
                        data: response.data.filter(d => d.address.id === addressID).map(r => {
                            return {
                                ...r,
                                residentId: r.resident.id,
                                installedMeterId: r.installedMeter.id
                            }
                        }),
                        page: 0,
                        totalCount: response.data.length
                    })
                })
            })}

            editable={{
                onRowAdd: newData => addResidence({ ...newData, addressId: addressID }),
                onRowUpdate: (newData, oldData) => putResidence(oldData.id, { ...newData, addressId: addressID }),
                onRowDelete: oldData => deleteResidence(oldData.id)
            }}

            detailPanel={(rowData) => {
                const options = {
                    responsive: true,
                    bezierCurve :true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: '?????????? ???????????????????? ???????????????????????????? ???? ????????????????',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },

                    elements: {
                        line: {
                            tension: 0.5
                        }
                    }
                };

                const labels = rowData.bills.map(bill => String(bill.month).padStart(2, 0) + "/" + bill.year);

                const data = {
                    labels,
                    datasets: [
                        {
                            label: '?????????? ???????????????????? ??????????????',
                            data: rowData.bills.map(bill => bill.nightSum / bill.tarrif.nightTarrifCost),
                            borderColor: 'rgb(102, 102, 255)',
                            backgroundColor: 'rgba(102, 102, 255, 0.5)',
                        },
                        {
                            label: '?????????? ???????????????????? ????????????????????????????',
                            data: rowData.bills.map(bill => bill.daySum / bill.tarrif.dayTarrifCost),
                            borderColor: 'rgb(255, 204, 0)',
                            backgroundColor: 'rgba(255, 204, 0, 0.5)',
                        },
                    ],
                };

                return <Line options={options} data={data} />;
            }}

        />
    </div>);
}

export default ResidenceTable;