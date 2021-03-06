import { useEffect, useState, forwardRef } from 'react';
import { addCity, deleteCity, getAllCities, putCity } from '../../../../API/city';

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
import DistrictsTable from '../DistrictsTable/DistrictsTable';

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

const CitiesTable = () => {


    return (<div>
        <MaterialTable
            title="??????????"
            icons={tableIcons}

            options={{
                paging: false
            }}
            columns={[
                { title: '??????????', field: 'name', type: 'string' },
                { title: '??????????????????', field: 'population', type: 'number' },
            ]}
            data={query => new Promise((resolve, reject) => {
                getAllCities().then((response) => {
                    resolve({
                        data: response.data,
                        page: 0,
                        totalCount: response.data.length
                    })
                })
            })}

            editable={{
                onRowAdd: newData => addCity(newData),
                onRowUpdate: (newData, oldData) => putCity(oldData.id, newData),
                onRowDelete: oldData => deleteCity(oldData.id)
            }}

            detailPanel={rowData => {
                return <div style={{paddingLeft: '2em', paddingRight: '2em', paddingBottom: '3em'}}>
                    <DistrictsTable cityID={rowData.id} />
                </div>
            }}

        />
    </div>);
}

export default CitiesTable;