import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import api from '../api/api';
import './style.css';
import icon from '../assets/icon.png';
import triste from '../assets/triste.png';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'


function Temperature() {
    const [temperature, setTemperature] = useState([])

    //animation affichage d'element 
    const [show, setShow] = useState(false);
    const [showGraph, setShowGraph] = useState(false);

    //jour actuel
    const date = new Date()
    const year = date.getFullYear()
    const day = date.getDate()
    const month = date.getMonth()
    const urlDate = year + "-" + month + "-" + day;

    const data = {
        labels: temperature.map(temp => temp.heure_mesure_temp),
        datasets: [
            {
                label: "Temperature des cours d'eau du "+ urlDate +"",
                data: temperature.map(temp => temp.code_unite),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    }

    const fetchTemperature = async () => {
        const { data } = await api.get(`/v1/temperature/chronique?code_departement=33&date_debut_mesure=${urlDate}`)
        setTemperature(data.data)
    }

    const dateTransform = (e) => {
        const date = new Date(e)
        const month = date.toLocaleString('default', { month: 'long' })
        const stringdays = date.toLocaleString('default', { weekday: 'long' })
        const days = date.getDate()
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
                <div className='temperature-ext'>
                    {showGraph == false &&
                        temperature.length !== 0 ?
                        temperature.slice(0, 5).map((temp) => (
                            <div className=' col-lg-2'>
                                <div className='block-heure' >
                                    <p>{temp.heure_mesure_temp}</p>
                                </div>
                                <div className='block-temperature' >
                                    <div>
                                        <p><span>Station:</span> {temp.libelle_station} </p>
                                    </div>
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
                        )) :
                        showGraph == false &&
                        <div className='msg-error' >
                            <p>Aucune mesure est disponible<br /> pour ce jour <br /> <span><img src={triste} height="50" width="50" alt='icon triste' /></span> </p>
                        </div>
                    }
                </div>
                <div className='temperature-plus'>
                    {show &&
                        temperature.map((temp) => (
                            <div className='block-temperature-plus col-lg-2'>
                                <div className='block-heure' >
                                    <p>{temp.heure_mesure_temp}</p>
                                </div>
                                <div className='block-temperature' >
                                    <div>
                                        <p><span>Station:</span> {temp.libelle_station} </p>
                                    </div>
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
            </div>
            {showGraph &&
                <div className='graph'>
                    <Line data={data} />
                </div>
            }
            <div className='btn-temperature' >
                <div>
                    <Button variant="link" onClick={() => setShowGraph(prev => !prev)}>{showGraph ? 'revenir à la version block' : 'Voir le graphique' }</Button>
                </div>
                <div>
                    <Button variant="link" onClick={() => setShow(prev => !prev)}>{show ? "afficher moin d'heure" : "Voir plus d'heure"}</Button>
                </div>
            </div>
        </div>
    );
}

export default Temperature;