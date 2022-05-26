import classes from './UnprocessedRequest.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close'

import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { putProvidedService } from '../../../../API/providedService';
import { postInstalledMeter } from '../../../../API/installedMeter';
import { toast } from 'react-toastify';
import { putResidence } from '../../../../API/residence';
import { useSelector } from 'react-redux';

const UnprocessedRequest = ({ providedService, updator, isProcessed }) => {

    const [expanded, setExpanded] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [completionTime, setCompletionTime] = useState(new Date().toISOString())
    const [serialNumber, setSerialNumber] = useState('');
    const user_id = useSelector(state=>state.account.id);

    const city = providedService.serviceRequest.residence.address.street.district.city.name;
    const district = providedService.serviceRequest.residence.address.street.district.name
    const street = providedService.serviceRequest.residence.address.street.name;
    const residence = providedService.serviceRequest.residence;
    const buidlingNumber = residence.address.buildingNumber;
    const apartmentNumber = residence.apartmentNumber;
    const entranceNumber = residence.entranceNumber;
    const resident = residence.resident;

    const simpleServiceConfirm = () => {
        const promise = putProvidedService(
            providedService.id,
            {
                id: providedService.id,
                serviceRequestId: providedService.serviceRequest.id,
                isCompleted: true,
                completedTime: completionTime,
                engineerId: user_id
            }
        ).then(() => {
            updator();
            setExpanded(false);
            setShowDialog(false);
        })

        toast.promise(
            promise,
            {
                pending: 'Обробка підтвердження',
                success: 'Виконання послуги підтверджено',
                error: 'Сталася помилка. Зверніться до адміністратора'
            }
        )
    }


    const complexServiceConfirm = () => {
        const promise = putProvidedService(
            providedService.id,
            {
                id: providedService.id,
                serviceRequestId: providedService.serviceRequest.id,
                isCompleted: true,
                completedTime: completionTime,
                engineerId: user_id
            }
        ).then(() => {
            postInstalledMeter(
                {
                    id: 0,
                    instalationDate: completionTime,
                    serialNumber: serialNumber,
                    modelId: providedService.serviceRequest.meterModel.id
                }
            ).then((installedMeterResponse) => {
                putResidence(
                    residence.id,
                    {
                        id: residence.id,
                        addressId: residence.address.id,
                        residentId: resident.id,
                        installedMeterId: installedMeterResponse.data.id,
                        entranceNumber: residence.entranceNumber,
                        apartmentNumber: residence.apartmentNumber,
                        floorNumber: residence.floorNumber,
                        size: residence.size
                    }
                ).then(residenceResponse => {
                    updator();
                    setExpanded(false);
                    setShowDialog(false);
                })
            })
        })

        toast.promise(
            promise,
            {
                pending: 'Обробка підтвердження',
                success: 'Виконання послуги підтверджено',
                error: 'Сталася помилка. Зверніться до адміністратора'
            }
        )
    }

    return (<div className={classes.UnprocessedRequest}>
        <header>
            <h1 style={{color: !!isProcessed ? 'gray': 'black'}}>{providedService.serviceRequest.service.serviceName}, {"вул. " + street}, {"буд. " + buidlingNumber} {apartmentNumber ? "кв. " + apartmentNumber : ""}</h1>
            <IconButton style={{ height: '50px', width: '50px' }} onClick={() => { setExpanded(!expanded) }}>
                <ExpandMoreIcon style={{ transition: 'all 1s', transform: expanded ? 'rotate(180deg)' : '' }} />
            </IconButton>
        </header>
        <main
            style={{
                display: expanded ? 'block' : 'none'
            }}
        >

            <h1>Інформація про користувача</h1>
            <div className={classes.singleLineInfob}>Адреса : <b>місто {city}, район {district}, вул. {street}, буд. {buidlingNumber} {entranceNumber ? ", під'їзд " + entranceNumber + ", кв. " + apartmentNumber : ''} </b></div>
            <div className={classes.singleLineInfob}>Ім'я клієнта: <b>{resident.firstName + " " + resident.lastName}</b></div>
            <div className={classes.singleLineInfob}>Номер телефону: <b>{resident.phoneNumber}</b></div>
            <div className={classes.singleLineInfob}>Запит надійшов: <b>{new Date(providedService.serviceRequest.receivedAt).toLocaleString("en-GB")}</b></div>
            <div className={classes.singleLineInfob}>Встановлена модель лічильника: <b>{residence.installedMeter.model.manufacturer.name} {residence.installedMeter.model.modelName}</b></div>
            <hr></hr>
            <h1>Інформація про послугу</h1>
            <div className={classes.singleLineInfo}>Тип послуги: <b>{providedService.serviceRequest.service.serviceName.toLowerCase()}</b></div>
            <h2>Опис послуги</h2>
            <p>{providedService.serviceRequest.service.description}</p>
            {
                providedService.serviceRequest.service.id <= 2 &&
                <div className={classes.singleLineInfo}>Встановлювана модель лічильника: <b>{providedService.serviceRequest.meterModel.manufacturer.name} {providedService.serviceRequest.meterModel.modelName}</b></div>
            }

            {
                !!isProcessed && <>
                    <hr></hr>
                    <h1>Інформація про надання послуги</h1>
                    <div className={classes.singleLineInfo}>Дата надання послуги: <b>{new Date(providedService.completedTime).toLocaleString('en-GB')}</b></div>
                </>
            }
            {
                !isProcessed &&
                <div className={classes.footer}>
                    <Button
                        variant={'contained'}
                        color='success'
                        onClick={() => setShowDialog(true)}
                    >
                        Підтвердити виконання
                    </Button>
                </div>

            }

        </main>
        <Dialog
            open={showDialog}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} style={{ display: 'flex' }}>
                <h3 style={{ margin: 0, fontWeight: 400 }}>Підтвердити виконання послуги</h3>
                <IconButton
                    aria-label="close"
                    onClick={() => setShowDialog(false)}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>

                <Carousel
                    showStatus={false}
                    selectedItem={currentTab}
                    className={classes.readingsCarousel}
                    showThumbs={false}
                    showArrows={false}
                    renderIndicator={() => false}

                >
                    <div >
                        <div style={{ paddingTop: '5px' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    ampm={false}
                                    label="Час надання послуги"
                                    value={completionTime}
                                    onChange={(newValue) => {
                                        setCompletionTime(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <IconButton onClick={() => setShowDialog(false)}>
                                <CloseIcon />
                            </IconButton>
                            {providedService.serviceRequest.service.id > 2 &&
                                <IconButton onClick={() => simpleServiceConfirm()}>
                                    <CheckIcon />
                                </IconButton>
                            }
                            {providedService.serviceRequest.service.id <= 2 &&
                                <IconButton onClick={() => setCurrentTab(1)}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            }
                        </div>
                    </div>
                    <div>
                        <TextField
                            label="Серійний номер лічильника"
                            value={serialNumber}
                            onChange={(ev) => setSerialNumber(ev.target.value)}
                        />
                        <div style={{ marginTop: '10px' }}>
                            <IconButton onClick={() => setCurrentTab(0)}>
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton onClick={() => complexServiceConfirm()}>
                                <CheckIcon />
                            </IconButton>
                        </div>
                    </div>
                </Carousel>


            </DialogContent>
        </Dialog>
    </div>);
}

export default UnprocessedRequest;