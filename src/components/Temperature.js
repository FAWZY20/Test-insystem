import { useEffect } from 'react';
import { useState } from 'react';
import api from '../api/api';
import './style.css';
import icon from '../assets/icon.png';
import Button from 'react-bootstrap/Button';


function Temperature() {
    const [temperature, setTemperature] = useState([])

    const fetchTemperature = async () => {
        const { data } = await api.get(`/v1/temperature/chronique?code_departement=33`)
        setTemperature(data.data)
    }

    const dateTransform = (e) => {
        const listdays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const date = new Date(e)
        const month = date.toLocaleString('default', { month: 'long' })
        const stringdays = listdays[date.getDay()]
        const days = date.getDay()
        return stringdays + " " + days + " " + month
    }

    const timeTransform = (e) => {
        const date = new Date(e)
        const houre = date.getHours()
        const minute = date.getMinutes()
        return houre + "H" + minute

    }

    useEffect(() => {
        fetchTemperature()
    }, [])

    return (
        <div id='accueil'>
            <div className='title' >
                <h1>temperature des cours d'eau</h1>
                <p><span>Departement :</span><br /> Gironde</p>
            </div>
            <div className='temperature'>
                {
                    temperature.slice(0, 5).map((temp) => (
                        <div className=' col-lg-2'>
                            <div className='block-heure' >
                                <p>{temp.heure_mesure_temp}</p>
                            </div>
                            <div className='block-temperature' >
                                <div className='block-temperature-icon' >
                                    <img src={icon} width="130" height="130" alt='' />
                                </div>
                                <div className='block-temperature-result' >
                                    <p>{temp.code_unite}{temp.symbole_unite}</p>
                                </div>
                                <div className='block-temperature-date' >
                                    <p>{dateTransform(temp.date_mesure_temp)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='btn-temperature'>
                <div>
                    <Button variant="link">Voir en format Graphique</Button>
                </div>
                <div>
                    <Button variant="link">Voir plus de temperature</Button>
                </div>
            </div>
        </div>
    );
}

export default Temperature;