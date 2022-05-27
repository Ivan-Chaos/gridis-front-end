import CitiesTable from '../AdminMainPage/components/CitiesTable/CitiesTable';
import ManufacturersTable from '../AdminMainPage/components/ManufacturersTable/Manufacturers';
import classes from './CitiesListing.module.scss';

const MetersListing = () => {
    return (<div className={classes.CitiesListing}>
        <header>
            <h1>Керування обладнанням</h1>
            <h2>Тут ви можете додавати та редагувати інформацію про моделі лічильників, виробників та встановлені лічильники.</h2>
        </header>
        <main>
            <ManufacturersTable />
        </main>
    </div>);
}

export default MetersListing;