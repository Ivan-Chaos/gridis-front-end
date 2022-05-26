import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleCallOperator } from '../../API/callOperator';
import CreateServiceRequest from './components/CreateServiceRequest/CreateServiceRequest';
import EnterReadings from './components/EnterReadings/EnterReadings';

import classes from './UserMainPage.module.scss'

const UserMainPage = () => {

    const user = useSelector(state=>state.account.name);
    const user_id = useSelector(state=>state.account.id);
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        if(user_id>0){
            getSingleCallOperator(user_id).then(response=>{
                setUserData(response.data);
            })
        }
    }, [user_id])


    return (<div className={classes.UserMainPage}>
        <header>
            <h1>Панель Оператора</h1>
            <h2>Ласкаво просимо, <b>{user}</b></h2>
            <h3>Ваш номер лінії: <b>{userData?.assignedPhoneNumber}</b></h3>
        </header>
        <hr></hr>
        <main>      
            <section>
                <EnterReadings />
            </section>  
            <hr></hr>
            <section>
                <CreateServiceRequest />
            </section>

        </main>
    </div>);
}

export default UserMainPage;