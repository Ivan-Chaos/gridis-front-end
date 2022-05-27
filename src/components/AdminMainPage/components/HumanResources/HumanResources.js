import classes from './HumanResources.module.scss'
import Engineer from './images/engineer.png'
import Admin from './images/admin.png';
import Operator from './images/operator.png';
import Person from './images/person.png'
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HumanResources = () => {
    const navigate = useNavigate();

    const links = [
        {
            img: Person,
            text: 'Люди(+персонал)',
            link: '/people',
        },

        {
            img: Engineer,
            text: 'Інженери',
            link: '/engineers',
        },

        {
            img: Operator,
            text: 'Оператори Call-центру',
            link: '/operators',
        },

        {
            img: Admin,
            text: 'Адміністратори',
            link: '/admins',
        }
    ]

    return (<div className={classes.HumanResources}>
        {
            links.map(link=>{
                return <div className={classes.personCard} onClick={()=>navigate(link.link)}>
                    <img src={link.img} />
                    <h2>{link.text}</h2>
                </div>
            })
        }
    </div>);
}
 
export default HumanResources;