import { useEffect, useState, forwardRef } from 'react';
import { addReadings, deleteReadings, getAllReadings, updateReadings } from '../../../../API/readings.js';

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
import { getAllInstalledMeters } from '../../../../API/installedMeter.js';


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

const ReadingsTable = ({ readingsID }) => {

    const [allMeters, setAllMeters] = useState({});

    useEffect(() => {
        getAllInstalledMeters().then(response => {
            setAllMeters(response.data.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.serialNumber;
                return acc;
            }, {}));
        })
    }, [])


    return (<div>
        <MaterialTable
            title="Показники"
            icons={tableIcons}

            options={{
                paging: false
            }}
            columns={[
                { title: 'Лічильник', field: 'installedMeterId', lookup: allMeters },
                { title: 'Дата отримання даних', field: 'dataCollectedAt', type: 'datetime', dateSetting: { locale: "en-GB" } },
                { title: 'Денні показники', field: 'dayReadings', type: 'numeric' },
                { title: 'Нічні показники', field: 'nightReadings', type: 'numeric' }
            ]}
            data={query => new Promise((resolve, reject) => {
                getAllReadings().then((response) => {
                    resolve({
                        data: response.data.map(e=>{return {...e, installedMeterId: e.installedMeter.id}}).filter(e=>e.id===readingsID),
                        page: 0,
                        totalCount: response.data.length
                    })
                })
            })}

            editable={{
                onRowAdd: newData => addReadings(newData),
                onRowUpdate: (newData, oldData) => updateReadings(newData.id, newData),
                onRowDelete: oldData => deleteReadings(oldData.id)
            }}
        />
    </div>);
}

export default ReadingsTable;