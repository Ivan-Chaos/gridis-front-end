import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleAdmin } from '../../API/admin';
import { getAllTarrifs } from '../../API/tarrif';
import CitiesTable from './components/CitiesTable/CitiesTable';

import classes from './UserMainPage.module.scss'

const UserMainPage = () => {

    const user = useSelector(state => state.account.name);
    const user_id = useSelector(state => state.account.id);
    const [userData, setUserData] = useState(null);
    const [currentTarrif, setCurrentTarrif] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        getSingleAdmin(user_id).then(response => {
            setUserData(response.data);
        });
    }, [user_id]);

    useEffect(() => {
        getAllTarrifs().then(response => {
            setCurrentTarrif(response.data.find(t => {
                return new Date(t.activeFrom).getTime() < new Date().getTime()
                    && new Date(t.activeTill).getTime() >= new Date().getTime()
            }))
        })
    }, []);

    return (<div className={classes.UserMainPage}>
        <header>
            <h1>Панель адміністратора</h1>
            <h2>Ласкаво просимо, <b>{user}</b></h2>
        </header>
        <hr></hr>
        <main>
            <div className={classes.tarrifDiv}>
                <h1>Поточний тариф</h1>
                <div className={classes.tarrifPanel}>
                    <div className={classes.singleSection}>
                        <h1 style={{color: 'orange'}}>{currentTarrif?.dayTarrifCost}</h1>
                        <p>Денна вартість</p>
                    </div>
                    <div className={classes.verticalSeparator}></div>
                    
                    <div className={classes.singleSection}>
                        <h1 style={{color: 'blue'}}>{currentTarrif?.nightTarrifCost}</h1>
                        <p>Нічна вартість</p>
                    </div>
                </div>
                <h2 onClick={()=>navigate('/tarrif-management')}>Інформація про тарифи</h2>
            </div>
            <hr style={{width: '100%'}}></hr>
            <div>
                <h1>Міста</h1>
                <CitiesTable />
            </div>
        </main>
    </div>);
}

export default UserMainPage;