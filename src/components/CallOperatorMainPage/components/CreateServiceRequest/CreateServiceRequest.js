import { useState, useEffect } from 'react';
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


import classes from './CreateServiceRequest.module.scss'
import { getAllServices } from '../../../../API/service';
import { getAllMeterModels } from '../../../../API/meterModel';
import { Button } from '@mui/material';
import { createServiceRequest } from '../../../../API/serviceRequest';

const CreateServiceRequest = () => {

    const operatorID = useSelector(state => state.account.id);

    const [currentTab, setCurrentTab] = useState(0);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [streets, setStreets] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [residences, setResidences] = useState([]);
    const [services, setServices] = useState([]);
    const [meterModels, setMeterModels] = useState([]);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedStreet, setSelectedStreet] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedResidence, setSelectedResidence] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedMeterModel, setSelectedMeterModel] = useState(null);

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

        getAllServices().then((response) => {
            setServices(response.data);
        })

        getAllMeterModels().then(response => {
            setMeterModels(response.data);
        })

    }, []);

    useEffect(() => {
        if (selectedAddress && selectedAddress?.isPrivateBuilding) {
            setSelectedResidence(residences.find(r => r.address.id === selectedAddress.id));
        }
    }, [selectedAddress])

    return (
        <div className={classes.CreateServiceRequest}>
            <header>
                <h1>
                    Замовлення послуг
                </h1>
            </header>
            <main>
                <section>
                    <div className={classes.subsection}>
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

                    <div className={classes.subsection}>
                        <Autocomplete
                            disabled={!selectedCity}
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
                </section>

                <section>
                    <div className={classes.subsection}>
                        <Autocomplete
                            disabled={!selectedDistrict}
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

                    <div className={classes.subsection}>
                        <Autocomplete
                            disabled={!selectedStreet}
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

                </section>

                <section>
                    <div className={classes.subsection}>
                        {
                            selectedAddress?.isPrivateBuilding &&
                            <p>Приватний будинок</p>
                        }

                        {
                            !selectedAddress?.isPrivateBuilding &&
                            <Autocomplete
                                disabled={!selectedAddress}
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
                        }
                    </div>

                    <div className={classes.subsection}>
                        {
                            !!selectedResidence &&
                            <>
                                <h3>Власник: {selectedResidence?.resident.firstName + " " + selectedResidence?.resident.lastName}</h3>
                                <p>Встановлений лічильник: {selectedResidence?.installedMeter.model.modelName} ({selectedResidence?.installedMeter.model.tarrifsCount}-тарифний)  </p>
                            </>
                        }
                    </div>

                </section>
                <hr style={{margin: '0', width: '100%'}}/>
                <section>
                    <div>
                        <h1>Оберіть послугу</h1>
                        <Autocomplete
                            disabled={!selectedResidence}
                            value={selectedService}
                            onChange={(event, newInputValue) => {
                                setSelectedService(newInputValue);
                            }}
                            options={services}
                            sx={{ width: 650 }}
                            getOptionLabel={option => option.serviceName}
                            renderInput={(params) => <TextField {...params} label="Послуга" />}
                        />
                        {
                            selectedService &&
                            <>
                                <h2>Опис</h2>
                                <p>{selectedService.description}</p>
                                <h3>Вартість : {selectedService.cost} гривень</h3>
                                {
                                    selectedService.id <= 2 &&
                                    <Autocomplete
                                        value={selectedMeterModel}
                                        onChange={(event, newInputValue) => {
                                            setSelectedMeterModel(newInputValue);
                                        }}
                                        style={{ marginBottom: '1em' }}
                                        options={meterModels.filter(mm => mm.tarrifsCount == selectedService.id)}
                                        sx={{ width: 650 }}
                                        getOptionLabel={option => option.manufacturer.name + " " + option.modelName}
                                        renderInput={(params) => <TextField {...params} label="Модель лічильника" />}
                                    />
                                }
                                <Button
                                    variant="contained"
                                    color="success"
                                    style={{ marginRight: '1em' }}
                                    onClick={() => {

                                        const promise = createServiceRequest({
                                            id: 0,
                                            serviceId: selectedService.id,
                                            residenceId: selectedResidence.id,
                                            callOperatorId: operatorID,
                                            meterModelId: selectedMeterModel ? selectedMeterModel.id : selectedResidence.installedMeter.id,
                                            receivedAt: new Date().toISOString()
                                        });

                                        toast.promise(
                                            promise,
                                            {
                                                pending: 'Обробка замовлення',
                                                success: 'Замовлення створено',
                                                error: 'Сталася помилка. Зверніться до адміністратора'
                                            }
                                        )
                                    }}
                                >
                                    Замовити
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        setSelectedCity(null);
                                        setSelectedDistrict(null);
                                        setSelectedStreet(null);
                                        setSelectedAddress(null);
                                        setSelectedResidence(null);
                                        setSelectedService(null);
                                        setSelectedMeterModel(null);
                                    }}
                                >
                                    Cкасувати
                                </Button>
                            </>
                        }

                    </div>

                </section>
            </main>
        </div>
    );
}

export default CreateServiceRequest;