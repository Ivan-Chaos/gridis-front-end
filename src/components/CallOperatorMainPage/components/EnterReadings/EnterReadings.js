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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EnterReadings = ({ setOpen }) => {
    const operatorID = useSelector(state => state.account.id);

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
                <h1>???????????? ??????????????????</h1>
                <p><span style={{ color: 'red' }}>??????????!</span> ?????????????????? ???????????????? ?????? ???????????????????? ???????????????????? ?? ????????????????????????. ?????????????????????????? ?????????? ?????????????????? ???? ???????????????? ???????????????? ?????????????? ?????? ????????</p>
                <div style={{ display: 'flex' }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setCurrentTab(1)}
                        style={{ marginRight: '1em' }}
                    >
                        ??????????????????
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setOpen(false)}
                    >
                        ??????????
                    </Button>
                </div>

            </div>

            {/* TAB 1 */}
            <div className={classes.readingsItem}>
                <h2>?????????????? ??????????</h2>

                <div>
                    <Autocomplete
                        value={selectedCity}
                        onInputChange={(event, newInputValue) => {
                            setSelectedCity(cities.find(e => e.name === newInputValue));
                        }}
                        options={cities}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.name}
                        renderInput={(params) => <TextField {...params} label="??????????" />}
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <Button
                        onClick={() => setCurrentTab(0)}
                        style={{ marginRight: '1em' }}
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(2)}
                        variant='outlined'
                        disabled={!selectedCity}
                    >
                        ????????????????????
                    </Button>
                </div>
            </div>

            {/* TAB 2 */}
            <div className={classes.readingsItem}>
                <h2>?????????????? ??????????</h2>
                <div>
                    <Autocomplete
                        value={selectedDistrict}
                        onChange={(event, newValue) => {
                            setSelectedDistrict(newValue);
                        }}
                        options={districts.filter(e => e.city.id === selectedCity?.id)}
                        sx={{ width: 300 }}
                        getOptionLabel={option => option.name}
                        renderInput={(params) => <TextField {...params} label="??????????" />}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button
                        onClick={() => setCurrentTab(1)}
                        style={{ marginRight: '1em' }}
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(3)}
                        variant='outlined'
                        disabled={!selectedDistrict}
                    >
                        ????????????????????
                    </Button>
                </div>
            </div>


            {/* TAB 3 */}
            <div className={classes.readingsItem}>
                <h2>?????????????? ????????????</h2>
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
                        renderInput={(params) => <TextField {...params} label="????????????" />}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button
                        onClick={() => setCurrentTab(2)}
                        style={{ marginRight: '1em' }}
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(4)}
                        variant='outlined'
                        disabled={!selectedStreet}
                    >
                        ????????????????????
                    </Button>
                </div>
            </div>

            {/* TAB 4 */}
            <div className={classes.readingsItem}>
                <h2>?????????????? ?????????? ??????????????</h2>

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
                        renderInput={(params) => <TextField {...params} label="?????????? ??????????????" />}
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <Button
                        onClick={() => setCurrentTab(3)}
                        style={{ marginRight: '1em' }}
                    >
                        <ArrowBackIcon />
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
                        variant='outlined'
                        disabled={!selectedAddress}
                    >
                        ????????????????????
                    </Button>
                </div>

            </div>

            {/* TAB 5 */}
            <div className={classes.readingsItem}>
                <h2>?????????????? ????????????????</h2>

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
                        renderInput={(params) => <TextField {...params} label="?????????? ????????????????" />}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button
                        onClick={() => setCurrentTab(4)}
                        style={{ marginRight: '1em' }}
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Button
                        onClick={() => setCurrentTab(6)}
                        variant='outlined'
                        disabled={!selectedStreet}
                    >
                        ????????????????????
                    </Button>
                </div>
            </div>

            {/* TAB 6 */}
            <div className={classes.readingsItem}>
                <h2>?????????????????????? ??????????????????</h2>
                <div className={classes.doubleCol}>
                    <div>
                        <h2>{!!selectedReadings ? "?????????????? ??????????????????" : '???????????? ??????????????????'}</h2>
                        <div className={classes.readingsSection}>
                            <TextField
                                value={currentDayReadings || 0}
                                className={classes.readingsField}
                                label="?????????? ??????????????????"
                                variant="outlined"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={(ev) => { setCurrentDayReadings(ev.target.value) }}
                            />

                            <TextField
                                disabled={selectedResidence?.installedMeter.model.tarrifsCount === 1}
                                value={currentNightReadings || 0}
                                className={classes.readingsField}
                                label="?????????? ??????????????????"
                                variant="outlined"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={(ev) => { setCurrentNightReadings(ev.target.value) }}
                            />
                        </div>
                    </div>

                    <div>
                        <h2>?????????????????? ??????????????????</h2>
                        {
                            !!selectedReadings &&
                            <div>
                                <h3>???????? ????????????????: {new Date(selectedReadings.dataCollectedAt).toLocaleString('en-GB')}</h3>
                                <p>?????????? ??????????????????: {selectedReadings.dayReadings}</p>
                                <p>?????????? ??????????????????: {selectedReadings.nightReadings}</p>
                            </div>
                        }
                        {
                            !selectedReadings &&
                            <h3 className={classes.noReadings}>?????????? ???????????? ???????????????????? ???? ??????????????????</h3>
                        }
                    </div>
                    <h2>

                    </h2>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
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
                        <ArrowBackIcon />
                    </Button>

                    <Button
                        color="error"
                        onClick={() => {
                            setCurrentTab(0);
                            setSelectedCity(null);
                            setSelectedDistrict(null);
                            setSelectedStreet(null);
                            setSelectedAddress(null);
                            setSelectedResidence(null);
                            setSelectedReadings(null);
                        }}
                        style={{marginRight: '1em'}}
                    >
                        ??????????????????
                    </Button>

                    <Button
                        variant={'contained'}
                        color='success'
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
                                        pending: '?????????????? ????????????',
                                        success: '?????????????????? ??????????????',
                                        error: '?????????????? ??????????????. ???????????????????? ???? ????????????????????????????'
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
                                        pending: '?????????????? ????????????',
                                        success: '?????????????????? ??????????????',
                                        error: '?????????????? ??????????????. ???????????????????? ???? ????????????????????????????'
                                    }
                                )
                            }
                        }}
                    >
                        ???????????? ??????????????????
                    </Button>
                </div>
            </div>
        </Carousel>
    </div>);
}

export default EnterReadings;