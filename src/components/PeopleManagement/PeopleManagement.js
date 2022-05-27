import { useEffect, useState, forwardRef } from 'react';
import { addPeople, deletePeople, getAllPeople, putPeople } from '../../API/people';
import classes from './PeopleManagement.module.scss'

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

const PeopleManagement = () => {


    return (<div className={classes.PeopleManagement}>
        <header>
            <h1>Керування людьми</h1>
            <h2>Тут ви можете створювати, видаляти та редагувати інформацію про людей. Даний перелік включає інформацію про персонал, тому перед видаленням обов'язково звітресь з таблицями адміністратора, інженера та оператора</h2>
        </header>
        <main>
            <MaterialTable
                title="Тарифи"
                icons={tableIcons}

                options={{
                    paging: false
                }}
                columns={[
                    { title: 'Прізвище', field: 'firstName', type: 'string'},
                    { title: 'Ім\'я', field: 'lastName', type: 'string'},
                    { title: 'Електронна пошта', field: 'email', type: 'numestringric' },
                    { title: 'Номер телефону', field: 'phoneNumber', type: 'string' },
                ]}
                data={query => new Promise((resolve, reject) => {
                    getAllPeople().then((response) => {
                        resolve({
                            data: response.data,
                            page: 0,
                            totalCount: response.data.length
                        })
                    })
                })}

                editable={{
                    onRowAdd: newData => addPeople(newData),
                    onRowUpdate: (newData, oldData) =>putPeople(newData.id, newData),
                    onRowDelete: oldData => deletePeople(oldData.id)
                }}
            />
        </main>
    </div>);
}

export default PeopleManagement;