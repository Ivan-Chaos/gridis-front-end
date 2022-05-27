import CitiesTable from '../AdminMainPage/components/CitiesTable/CitiesTable';
import ManufacturersTable from '../AdminMainPage/components/ManufacturersTable/Manufacturers';
import classes from './CitiesListing.module.scss';
import ServicesTable from './components/ServicesTable/ServicesTable';

const ServicesListing = () => {
    return (<div className={classes.CitiesListing}>
        <header>
            <h1>Керування послугами</h1>
            <h2>Тут ви можете додавати та редагувати інформацію про послуги</h2>
        </header>
        <main>
            <ServicesTable />
        </main>
    </div>);
}

export default ServicesListing;