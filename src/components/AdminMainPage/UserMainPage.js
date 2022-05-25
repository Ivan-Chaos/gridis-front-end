import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './UserMainPage.module.scss'

const UserMainPage = () => {

    const [user, setUser] = useState(null);

    return (<div className={classes.UserMainPage}>
        <header>
            <h1>Панель оператора call-центру </h1>
            
        </header>
        <main>        

        </main>
    </div>);
}

export default UserMainPage;