import { useEffect, useState, forwardRef } from 'react';
import { addBill, deleteBill, getAllBills, putBill } from '../../API/bill.js';
import classes from './BillManagement.module.scss'

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
import { getAllPeople } from '../../API/people';
import { getAllResidences} from '../../API/residence';
import ReadingsTable from './components/ReadingsTable/ReadingsTable.js';

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

const BillManagement = () => {

    const [allResidences, setAllResidences] = useState({});

    useEffect(()=>{
        getAllResidences().then(response=>{
            setAllResidences(response.data.reduce(function (acc, cur, i) {
                acc[cur.id] = "м. " + cur.address.street.district.city.name + ", вул. " + cur.address.street.name+", буд. "+cur.address.buildingNumber + (!cur.address.isPrivateBuilding ? ', кв. '+cur.apartmentNumber : "");
                return acc;
            }, {}));
        })
    }, [])
    

    return (<div className={classes.BillManagement}>
        <header>
            <h1>Керування рахунками</h1>
            <h2><span style={{color: 'red'}}>УВАГА!</span> Рахунки є автоматично сформованими даними, редагування рахунків дозволяється лише в окремих випадках</h2>
        </header>
        <main>
            <MaterialTable
                title="Рахунки"
                icons={tableIcons}

                options={{
                    paging: false
                }}
                columns={[
                    { title: 'Номер рахунку', field: 'billNumber'},
                    { title: 'Житло', field: 'residenceId', lookup: allResidences},
                    { title: 'Місяць', field: 'month', type: 'numeric' },
                    { title: 'Рік', field: 'year', type: 'numeric' },
                    { title: 'Дата формування', field: 'generatedAt', type: 'datetime', dateSetting: {locale: "en-GB"}},
                    { title: 'Денна сума', field: 'daySum', type: 'numeric'},
                    { title: 'Нічна сума', field: 'nightSum', type: 'numeric'},
                    { title: 'Загальна сума', field: 'totalSum', type: 'numeric'}
                ]}
                data={query => new Promise((resolve, reject) => {
                    getAllBills().then((response) => {
                        resolve({
                            data: response.data,
                            page: 0,
                            totalCount: response.data.length
                        })
                    })
                })}

                editable={{
                    onRowAdd: newData => addBill(newData),
                    onRowUpdate: (newData, oldData) =>putBill(newData.id, newData),
                    onRowDelete: oldData => deleteBill(oldData.id)
                }}

                detailPanel={rowData => {
                    return <div style={{ paddingLeft: '2em', paddingRight: '2em', paddingBottom: '3em' }}>
                        <ReadingsTable readingsID={rowData.readings.id} />
                    </div>
                }}
            />
        </main>
    </div>);
}

export default BillManagement;