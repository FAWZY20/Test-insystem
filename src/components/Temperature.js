import { useEffect } from 'react';
import { useState } from 'react';
import api from '../api/api';
import './style.css'


function Temperature() {
    const [temperature, setTemperature] = useState([])

    const fetchTemperature = async () => {
        const { data } = await api.get(`/v1/temperature/chronique`)
        setTemperature(data.data)
    }

    useEffect(() => {
        fetchTemperature()
    }, [])

    return (
        <div>
            {
                temperature.map((temp) => (
                    <p>{temp.code_station}</p>
                ))
            }
        </div>
    );
}

export default Temperature;