import classes from './ServicesPanel.module.scss'

import Meter from './images/meter.png';
import City from './images/city.png'
import Service from './images/service.png'
import Invoice from './images/invoice.png';

import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ServicesPanel = () => {
    const navigate = useNavigate();

    const links = [
        {
            img: Meter,
            text: 'Обладнання',
            link: '/meters',
        }, 
        {
            img: City,
            text: 'Міста',
            link: '/cities',
        }, 
        {
            img: Service,
            text: 'Послуги',
            link: '/services',
        }, 
        {
            img: Invoice,
            text: 'Квитанції',
            link: '/invoices'
        }
    ]

    return (<div className={classes.ServicesPanel}>
        {
            links.map(link=>{
                return <div className={classes.serviceCard} onClick={()=>navigate(link.link)}>
                    <img src={link.img} />
                    <h2>{link.text}</h2>
                </div>
            })
        }
    </div>);
}
 
export default ServicesPanel;