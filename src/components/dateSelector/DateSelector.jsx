import React, { useContext } from 'react'
import { FixturesContext } from '../../contexts/FixturesContext'

const DateSelector = () => {
    const { setSelectedDate } = useContext(FixturesContext)

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value)
    }

    return (
        <div>
            <label htmlFor="date">Seleccionar Fecha: </label>
            <input type="date" id="date" onChange={handleDateChange} />
        </div>
    )
}

export default DateSelector