import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleEnigneer } from '../../API/engineer';
import UnprocessedRequest from './components/UnprocessedRequest/UnprocessedRequest';

import classes from './UserMainPage.module.scss'

const UserMainPage = () => {

    const user = useSelector(state => state.account.name);
    const user_id = useSelector(state => state.account.id);
    const [userData, setUserData] = useState(null);

    const [processedRequests, setProcessedRequests] = useState([]);
    const [unprocessedRequest, setUnprocessedRequest] = useState([]);

    useEffect(() => {
        if (user_id > 0) {
            getSingleEnigneer(user_id).then(response => {
                setUserData(response.data);
                setProcessedRequests(response.data.providedServices.filter(ps => ps.isCompleted))
                setUnprocessedRequest(response.data.providedServices.filter(ps => !ps.isCompleted))
            })
        }
    }, [user_id])

    const updator = () => {
        getSingleEnigneer(user_id).then(response => {
            setUserData(response.data);
            setProcessedRequests(response.data.providedServices.filter(ps => ps.isCompleted))
            setUnprocessedRequest(response.data.providedServices.filter(ps => !ps.isCompleted))
        })
    }


    return (<div className={classes.UserMainPage}>
        <header>
            <h1>Панель інженера </h1>
            <h2>Ласкаво просимо, <b>{user}</b></h2>
            <h3>Ваш район діяльності: <b>{userData?.district.name}, {userData?.district.city.name}</b></h3>
        </header>
        <main>
            <section>
                <h1>Неопрацьовані запити</h1>
                {
                    unprocessedRequest.map((providedService) => {
                        return (<UnprocessedRequest providedService={providedService} updator={updator}/>)
                    })
                }
            </section>

            <section>
                <h1>Опрацьовані запити</h1>
                {
                    processedRequests.map((providedService) => {
                        return (<UnprocessedRequest providedService={providedService} updator={updator} isProcessed={true}/>)
                    })
                }
            </section>
        </main>

    </div>);
}

export default UserMainPage;