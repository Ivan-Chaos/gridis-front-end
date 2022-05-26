import { Button, makeStyles, withStyles } from '@mui/material';
import { useEffect, useState } from 'react';
import classes from './EnterReadings.module.scss'
import { Carousel } from 'react-responsive-carousel';
import { getAllCities } from '../../../../API/city';
import { getAllDistricts } from '../../../../API/district';
import { getAllStreets } from '../../../../API/street';
import { getAllAddresses } from '../../../../API/address';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllResidences } from '../../../../API/residence';
import { getAllReadings, postReadingsFromOperator, updateReadings } from '../../../../API/readings';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const EnterReadings = () => {
    const operatorID = useSelector(state=>state.account.id);

    const [currentTab, setCurrentTab] = useState(0);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [streets, setStreets] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [residences, setResidences] = useState([]);
    const [readings, setReadings] = useState([]);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedStreet, setSelectedStreet] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedResidence, setSelectedResidence] = useState(null);
    const [selectedReadings, setSelectedReadings] = useState(null);

    const [currentNightReadings, setCurrentNightReadings] = useState(0);
    const [currentDayReadings, setCurrentDayReadings] = useState(0);

    useEffect(() => {
        getAllCities().then(response => {
            setCities(response.data);
        });

        getAllDistricts().then(response => {
            setDistricts(response.data);
        });

        getAllStreets().then(response => {
            setStreets(response.data);
        });

        getAllAddresses().then(response => {
            setAddresses(response.data);
        });

        getAllResidences().then(response => {
            setResidences(response.data);
        });

        getAllReadings().then(response => {
            setReadings(response.data);
        })
    }, []);

    useEffect(() => {
        if (selectedResidence) {
            const residenceReadings = readings.find(r => {
                return r.installedMeter.id === selectedResidence.installedMeter.id
                    && (new Date(r.dataCollectedAt)).getMonth() == (new Date()).getMonth()
                    && (new Date(r.dataCollectedAt)).getYear() == (new Date()).getYear()
            });

            setSelectedReadings(residenceReadings);
        }
    }, [selectedResidence])

    useEffect(() => {
        if (selectedReadings) {
            setCurrentNightReadings(selectedReadings.nightReadings);
            setCurrentDayReadings(selectedReadings.dayReadings);
        }
    }, [selectedReadings])

    return (<div className={classes.EnterReadings}>
        <Carousel
            showStatus={false}
            selectedItem={currentTab}
            className={classes.readingsCarousel}
            showThumbs={false}
            showArrows={false}
            renderIndicator={() => false}
        >

            {/* TAB 0 */}
            <div className={classes.readingsItem}>
                <h1>Внести показники</h1>
                <Button
                    onClick={() => setCurrentTab(1)}
                >
                    Розпочати
                </Button>
            </div>

            {/* TAB 1 */}
            <div className={classes.readingsItem}>
                <h2>Вкажіть місто</h2>

                <div>
                    <Autocomplete
                        value={selectedCity}
                        onInputChange={(event, newInputValue) => {
                            setSelectedCity(cities.find(e => e.name === newInputValue));
                        }}
                        options={cities}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.name}
                        renderInput={(params) => <TextField {...params} label="Місто" />}
                    />
                </div>

                <div>
                    <Button
                        onClick={() => setCurrentTab(0)}
                    >
                        Назад
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(2)}
                    >
                        Продовжити
                    </Button>
                </div>
            </div>

            {/* TAB 2 */}
            <div className={classes.readingsItem}>
                <h2>Вкажіть район</h2>
                <div>
                    <Autocomplete
                        value={selectedDistrict}
                        onChange={(event, newValue) => {
                            setSelectedDistrict(newValue);
                        }}
                        options={districts.filter(e => e.city.id === selectedCity?.id)}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.name}
                        renderInput={(params) => <TextField {...params} label="Район" />}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => setCurrentTab(1)}
                    >
                        Назад
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(3)}
                    >
                        Продовжити
                    </Button>
                </div>
            </div>


            {/* TAB 3 */}
            <div className={classes.readingsItem}>
                <h2>Вкажіть вулицю</h2>
                <div>
                    <Autocomplete
                        value={selectedStreet}
                        onChange={(event, newInputValue) => {
                            setSelectedStreet(newInputValue);
                        }}
                        options={streets.filter(e => {
                            return e.district.id === selectedDistrict?.id
                        })}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.name}
                        renderInput={(params) => <TextField {...params} label="Вулиця" />}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => setCurrentTab(2)}
                    >
                        Назад
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(4)}
                    >
                        Продовжити
                    </Button>
                </div>
            </div>

            {/* TAB 4 */}
            <div className={classes.readingsItem}>
                <h2>Вкажіть номер будинку</h2>

                <div>
                    <Autocomplete
                        value={selectedAddress}
                        onChange={(event, newInputValue) => {
                            setSelectedAddress(newInputValue);
                        }}
                        options={addresses.filter(e => {
                            return e.street.id === selectedStreet?.id
                        })}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.buildingNumber}
                        renderInput={(params) => <TextField {...params} label="Номер будинку" />}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => setCurrentTab(3)}
                    >
                        Назад
                    </Button>

                    <Button
                        onClick={() => {
                            if (selectedAddress.isPrivateBuilding) {
                                setCurrentTab(6);
                                setSelectedResidence(residences.find(e => e.address.id === selectedAddress.id))
                            } else {
                                setCurrentTab(5)
                            }
                        }}
                    >
                        Продовжити
                    </Button>
                </div>
            </div>

            {/* TAB 5 */}
            <div className={classes.readingsItem}>
                <h2>Вкажіть квартиру</h2>

                <div>
                    <Autocomplete
                        value={selectedResidence}
                        onChange={(event, newInputValue) => {
                            setSelectedResidence(newInputValue);
                        }}
                        options={residences.filter(e => {
                            return e.address.id === selectedAddress?.id
                        })}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.apartmentNumber}
                        renderInput={(params) => <TextField {...params} label="Номер квартири" />}
                    />
                </div>
                <div>
                    <Button
                        onClick={() => setCurrentTab(4)}
                    >
                        Назад
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(6)}
                    >
                        Продовжити
                    </Button>
                </div>
            </div>

            {/* TAB 6 */}
            <div className={classes.readingsItem}>
                <h2>Переглянути показники</h2>
                <div className={classes.doubleCol}>
                    <div>
                        <h2>{!!selectedReadings ? "Оновити показники" : 'Внести показники'}</h2>
                        <div className={classes.readingsSection}>
                            <TextField
                                value={currentDayReadings || 0}
                                className={classes.readingsField}
                                label="Денні показники"
                                variant="outlined"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={(ev) => { setCurrentDayReadings(ev.target.value) }}
                            />

                            <TextField
                                disabled={selectedResidence?.installedMeter.model.tarrifsCount === 1}
                                value={currentNightReadings || 0}
                                className={classes.readingsField}
                                label="Нічні показники"
                                variant="outlined"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={(ev) => { setCurrentNightReadings(ev.target.value) }}
                            />
                        </div>
                    </div>

                    <div>
                        <h2>Попередні показники</h2>
                        {
                            !!selectedReadings &&
                            <div>
                                <h3>Дата внесення: {new Date(selectedReadings.dataCollectedAt).toLocaleString('en-GB')}</h3>
                                <p>Денні показники: {selectedReadings.dayReadings}</p>
                                <p>Нічні показники: {selectedReadings.nightReadings}</p>
                            </div>
                        }
                        {
                            !selectedReadings &&
                            <h3 className={classes.noReadings}>Цього місяця показників не вносилось</h3>
                        }
                    </div>
                    <h2>

                    </h2>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            if (selectedAddress.isPrivateBuilding) {
                                setCurrentTab(4);
                            }
                            else {
                                setCurrentTab(5);
                            }
                        }}
                    >
                        Назад
                    </Button>

                    <Button
                        onClick={() => {
                            setCurrentTab(0);
                            setSelectedCity(null);
                            setSelectedDistrict(null);
                            setSelectedStreet(null);
                            setSelectedAddress(null);
                            setSelectedResidence(null);
                            setSelectedReadings(null);
                        }}
                    >
                        Скасувати
                    </Button>

                    <Button
                        onClick={() => {
                            if (!!selectedReadings) {
                                const promise = updateReadings(
                                    selectedReadings.id,
                                    {
                                        id: selectedReadings.id,
                                        installedMeterId: selectedReadings.installedMeter.id,
                                        nightReadings: currentNightReadings,
                                        dayReadings: currentDayReadings,
                                        dataCollectedAt: new Date().toISOString()
                                    }
                                ).then(() => {
                                    setCurrentTab(0);
                                    setSelectedCity(null);
                                    setSelectedDistrict(null);
                                    setSelectedStreet(null);
                                    setSelectedAddress(null);
                                    setSelectedResidence(null);
                                    setSelectedReadings(null);

                                    getAllReadings().then(response => {
                                        setReadings(response.data);
                                    })
                                })

                                toast.promise(
                                    promise,
                                    {
                                        pending: 'Обробка запиту',
                                        success: 'Показники внесено',
                                        error: 'Сталася помилка. Зверніться до адміністратора'
                                    }
                                )
                            }
                            else {
                               
                                const promise = postReadingsFromOperator(
                                    operatorID,
                                    {
                                        installedMeterId: selectedResidence.installedMeter.id,
                                        nightReadings: currentNightReadings,
                                        dayReadings: currentDayReadings,
                                        dataCollectedAt: new Date().toISOString()
                                    }
                                ).then(() => {
                                    setCurrentTab(0);
                                    setSelectedCity(null);
                                    setSelectedDistrict(null);
                                    setSelectedStreet(null);
                                    setSelectedAddress(null);
                                    setSelectedResidence(null);
                                    setSelectedReadings(null);

                                    getAllReadings().then(response => {
                                        setReadings(response.data);
                                    })
                                })

                                toast.promise(
                                    promise,
                                    {
                                        pending: 'Обробка запиту',
                                        success: 'Показники внесено',
                                        error: 'Сталася помилка. Зверніться до адміністратора'
                                    }
                                )
                            }
                        }}
                    >
                        Внести показники
                    </Button>
                </div>
            </div>
        </Carousel>
    </div>);
}

export default EnterReadings;