import { useEffect, useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import classes from './BaseLayout.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, setEmail, setName } from '../../store/slices/accountSlice';
import { useSelect } from '@mui/base';
import { getSingleAdmin } from '../../API/admin';
import { getSingleEnigneer } from '../../API/engineer';
import { getSingleCallOperator } from '../../API/callOperator';


const BaseLayout = (props) => {
    const jwt = useSelector(state => state.account.jwt);
    const user_id = useSelector(state => state.account.id);
    const user_role = useSelector(state => state.account.role);

    const [user, setUser] = useState(jwt === '');
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = async () => {
        dispatch(clearState());
        navigate('/');
    }

    useEffect(() => {
        setUser(jwt !== '');
    }, [jwt]);

    useEffect( () => {

        const fetch_user_data = async () => {
            if (user_id > 0 && user_role !== '') {
                let local_user;

                if (user_role === "Admin") {
                    local_user = await getSingleAdmin(user_id);
                } else if (user_role === "Engineer") {
                    local_user = await getSingleEnigneer(user_id);
                } else if (user_role === "CallOperator") {
                    local_user = await getSingleCallOperator(user_id)
                }

                setAccount(local_user.data);
                dispatch(setEmail(local_user.data.person.email));
                dispatch(setName(local_user.data.person.firstName + " " + local_user.data.person.lastName));
            }
        }

        fetch_user_data();
    }, [user_id, user_role])

    return (<div className={classes.BaseLayout}>
        <nav>
            <h1 onClick={() => {
                if(user_role==='CallOperator'){
                    navigate('/operator-main');
                }else if(user_role==='Engineer'){
                    navigate('/engineer-main');
                }else if(user_role==="Admin"){
                    navigate('/admin-main')
                }
            }}>Gridis⚡</h1>
            {user &&
                <div className={classes.userDiv}>
                    <PersonIcon className={classes.personIcon} />
                    <div className={classes.username} onClick={()=>navigate('/')}>{account?.person?.email}</div>
                    <div className={classes.logout} onClick={() => logout()}>Log out</div>
                </div>
            }

            {!user &&
                <div className={classes.userDiv}>
                    <div className={classes.logout} onClick={() => navigate('/login')}>Sign in</div>
                </div>
            }
        </nav>

        <main>
            {props.children}
        </main>





    </div>);
}

export default BaseLayout;