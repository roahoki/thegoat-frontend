import React, { createContext, useState } from 'react'

// Crear el contexto
export const FixturesContext = createContext()

// Proveedor del contexto
export const FixturesProvider = ({ children }) => {
    const [selectedLeague, setSelectedLeague] = useState(null)

    return (
        <FixturesContext.Provider value={{ selectedLeague, setSelectedLeague }}>
            {children}
        </FixturesContext.Provider>
    )
}