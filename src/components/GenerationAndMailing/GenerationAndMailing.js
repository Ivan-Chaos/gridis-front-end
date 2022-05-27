import { Button } from '@mui/material';
import { useEffect, useState, forwardRef } from 'react';
import { toast } from 'react-toastify';
import { initiateGeneration } from '../../API/generationAndMailing';

import classes from './GenerationAndMailing.module.scss'


const GenerationAndMailing = () => {

    const handleMailing = ()=>{
        const promise = initiateGeneration();

        toast.promise(
            promise,
            {
                pending: 'Формування рахунків та розсилка',
                success: 'Рахунки сформовано',
                error: 'Сталася помилка. Зверніться до адміністратора'
            }
        )
    }

    return (<div className={classes.GenerationAndMailing}>
        <header>
            <h1>Формування та генерація рахунків</h1>
            <h2>Тут ви можете формувати рахунки та ініціювати їхню розсилку поштою</h2>
        </header>
        <main>
            <Button onClick={()=>handleMailing()}>
                Сформувати та розіслати
            </Button>
        </main>
    </div>);
}

export default GenerationAndMailing;