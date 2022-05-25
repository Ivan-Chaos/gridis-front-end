import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import classes from './LoginPage.module.scss'
import { userLogin } from "../../API/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId, setJWT, setRole } from "../../store/slices/accountSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const [password, setPassword] = useState(undefined);
    const [username, setUsername] = useState(undefined);

    const [error, setError] = useState(undefined);   

    const login = async () => {
        try{
            const response = await userLogin(username, password);

            dispatch(setJWT(response.data.jwtToken));
            dispatch(setRole(response.data.role));
            dispatch(setId(response.data.id));

            debugger;
            if(response.data.role==="Admin"){
                navigate('/admin-main');
            }else if(response.data.role==="Engineer"){
                navigate('/engineer-main');
            }else if(response.data.role==="CallOperator"){
                navigate('/operator-main')
            }
        }catch(error){
            debugger;
        }
    }

    return (<div className={classes.LoginPage}>
        <div className={classes.LoginPanel}>
            <header>
                <h1>
                    Login
                </h1>
            </header>
            <hr />
            <main>
                <TextField
                    className={classes.inputs}
                    label="E-mail"
                    onChange={(e) => {
                        setError(undefined);
                        setUsername(e.target.value);
                    }}
                />

                <TextField
                    className={classes.inputs}
                    label="Password"
                    type="password"
                    onChange={(e) => {
                        setError(undefined);
                        setPassword(e.target.value);
                    }}
                />

                <p>{error}</p>
            </main>

            <footer>

                <Button
                    className={classes.buttons}
                    variant="contained"
                    onClick={() => login()}
                >
                    Log in
                </Button>
            </footer>
        </div>
    </div>);
}

export default LoginPage;