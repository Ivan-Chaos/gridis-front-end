import CitiesTable from '../AdminMainPage/components/CitiesTable/CitiesTable';
import classes from './CitiesListing.module.scss';

const CitiesListing = () => {
    return (<div className={classes.CitiesListing}>
        <header>
            <h1>Керування містами</h1>
            <h2>Тут ви можете додавати та редагувати інформацію про міста.</h2>
        </header>
        <main>
            <CitiesTable />
        </main>
    </div>);
}

export default CitiesListing;