import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleCallOperator } from '../../API/callOperator';
import CreateServiceRequest from './components/CreateServiceRequest/CreateServiceRequest';
import EnterReadings from './components/EnterReadings/EnterReadings';
import Dialog from '@mui/material/Dialog';

import classes from './UserMainPage.module.scss'
import { Transition } from 'react-transition-group';

const transitions = {
    entering: {
        display: 'block'
    },
    entered: {
        opacity: 1,
        display: 'block'
    },
    exiting: {
        opacity: 0,
        display: 'block'
    },
    exited: {
        opacity: '0',
        display: 'none'
    }
};

const UserMainPage = () => {

    const user = useSelector(state => state.account.name);
    const user_id = useSelector(state => state.account.id);
    const [userData, setUserData] = useState(null);

    const [showEnterReadings, setShowEnterReadings] = useState(false);
    const [showCreateRequest, setShowCreateRequest] = useState(false);

    useEffect(() => {
        if (user_id > 0) {
            getSingleCallOperator(user_id).then(response => {
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
            <section style={{ marginTop: '6vh' }}>
                <button
                    onClick={() => {
                        setShowEnterReadings(true);
                    }}
                    className={classes.gradbut}
                >
                    Внести показники
                </button>

                <button
                    className={classes.gradbut2}
                    onClick={() => {
                        setShowCreateRequest(!showCreateRequest);
                    }}
                >
                    Створити запит на надання послуги
                </button>
            </section>

            <hr></hr>

            <section>
                <Transition in={showCreateRequest} timeout={300} >
                    {
                        state => (
                            <div
                                style={{
                                    transition: 'all 1s ease-out',
                                    display: 'none',
                                    ...transitions[state]
                                }}
                            >
                                <CreateServiceRequest />
                            </div>


                        )
                    }

                </Transition>
            </section>




            <Dialog
                open={showEnterReadings}
                onClose={() => setShowEnterReadings(false)}
            >
                <EnterReadings setOpen={setShowEnterReadings} />
            </Dialog>
        </main>
    </div>);
}

export default UserMainPage;