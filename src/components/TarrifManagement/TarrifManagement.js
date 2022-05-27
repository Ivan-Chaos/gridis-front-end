import { useEffect, useState, forwardRef } from 'react';
import { addTarrif, deleteTarrif, getAllTarrifs, putTarrif } from '../../API/tarrif';
import classes from './TarrifManagement.module.scss'

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

const TarrifManagement = () => {
    const [allTarrifs, setAllTarrifs] = useState([]);

    useEffect(() => {
        getAllTarrifs().then(response => {
            setAllTarrifs(response.data);
        })
    }, []);


    return (<div className={classes.TarrifManagement}>
        <header>
            <h1>Керування тарифами</h1>
            <h2>Тут ви можете створювати, видаляти та редагувати тарифи. Ні в якому разі не створюйте тарифи з датами які накладаються</h2>
        </header>
        <main>
            <MaterialTable
                title="Тарифи"
                icons={tableIcons}

                options={{
                    paging: false
                }}
                columns={[
                    { title: 'Активний від', field: 'activeFrom', type: 'datetime', type: 'datetime', dateSetting: { locale: "en-GB" } },
                    { title: 'Активний до', field: 'activeTill', type: 'datetime', dateSetting: { locale: "en-GB" } },
                    { title: 'Вартість денного тарифу', field: 'dayTarrifCost', type: 'numeric' },
                    { title: 'Вартість нічного тарифу', field: 'nightTarrifCost', type: 'numeric' },
                ]}
                data={query => new Promise((resolve, reject) => {
                    getAllTarrifs().then((response) => {
                        resolve({
                            data: response.data,
                            page: 0,
                            totalCount: response.data.length
                        })
                    })
                })}

                editable={{
                    onRowAdd: newData => addTarrif(newData),
                    onRowUpdate: (newData, oldData) =>putTarrif(newData.id, newData),
                    onRowDelete: oldData => deleteTarrif(oldData.id)
                }}


            />
        </main>
    </div>);
}

export default TarrifManagement;