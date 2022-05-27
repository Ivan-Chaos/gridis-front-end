import { useEffect, useState, forwardRef } from 'react';
import { addAdmin, deleteAdmin, getAllAdmins, putAdmin } from '../../API/admin';
import classes from './AdminManagement.module.scss'

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
import { getAllDistricts } from '../../API/district';

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

const AdminManagement = () => {
    const [allPeople, setAllPeople] = useState({});

    useEffect(() => {

        getAllPeople().then(response => {
            setAllPeople(response.data.reduce(function (acc, cur, i) {
                acc[cur.id] = cur.firstName + " " + cur.lastName;
                return acc;
            }, {}));
        });

    }, [])

    return (<div className={classes.AdminManagement}>
        <header>
            <h1>Керування операторами call-центру</h1>
            <h2>Тут ви можете створювати, видаляти та редагувати інформацію про операторів call-центру. Перш ніж додавати сюди особу переконайтесь, що вона була додана до загальної таблиці людей</h2>
        </header>
        <main>
            <MaterialTable
                title="Тарифи"
                icons={tableIcons}

                options={{
                    paging: false
                }}
                columns={[
                    { title: 'Особа', field: 'personId', lookup: allPeople },
                    { title: 'Логін', field: 'username', type: 'string' },
                    { title: 'Пароль', field: 'password', type: 'string' },
                ]}
                data={query => new Promise((resolve, reject) => {
                    getAllAdmins().then((response) => {
                        resolve({
                            data: response.data.map(e => { return { ...e, personId: e.person.id } }),
                            page: 0,
                            totalCount: response.data.length
                        })
                    })
                })}

                editable={{
                    onRowAdd: newData => addAdmin(newData),
                    onRowUpdate: (newData, oldData) => putAdmin(newData.id, newData),
                    onRowDelete: oldData => deleteAdmin(oldData.id)
                }}
            />
        </main>
    </div>);
}

export default AdminManagement;