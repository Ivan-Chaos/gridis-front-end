import CitiesTable from '../AdminMainPage/components/CitiesTable/CitiesTable';
import ManufacturersTable from '../AdminMainPage/components/ManufacturersTable/Manufacturers';
import classes from './CitiesListing.module.scss';
import InvoicesTable from './components/Invoicestable/InvoicesTable';

const InvoicesListing = () => {
    return (<div className={classes.CitiesListing}>
        <header>
            <h1>Керування квитанціями</h1>
            <h2>Тут ви можете переглянути які квитанції було внесено користувачами</h2>
        </header>
        <main>
            <InvoicesTable />
        </main>
    </div>);
}

export default InvoicesListing;