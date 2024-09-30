import React, { createContext, useState } from 'react'

// Crear el contexto
export const FixturesContext = createContext()

// Proveedor del contexto
export const FixturesProvider = ({ children }) => {
    const [selectedLeague, setSelectedLeague] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null) // Estado para la card seleccionada

    return (
        <FixturesContext.Provider value={{ selectedLeague, setSelectedLeague, selectedDate, setSelectedDate, selectedCard, setSelectedCard }}>
            {children}
        </FixturesContext.Provider>
    )
}