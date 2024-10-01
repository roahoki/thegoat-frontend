import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './Profile.css'

const Profile = () => {
    const { user, isAuthenticated } = useAuth0()
    const [saldo, setSaldo] = useState(0) // Estado para el saldo
    const [monto, setMonto] = useState('') // Estado para el monto a cargar
    const [showInput, setShowInput] = useState(false) // Estado para mostrar el input

    const handleLoadMoney = () => {
        setShowInput(true)
    }

    const handleMontoChange = (e) => {
        setMonto(e.target.value)
    }

    const handleAddMoney = () => {
        const montoNumerico = parseFloat(monto)
        if (!isNaN(montoNumerico) && montoNumerico > 0) {
            setSaldo(saldo + montoNumerico)
            setMonto('')
            setShowInput(false)
        }
    }

    return (
        isAuthenticated && (
            <div className='profile-container'>
                <div className='picture-container'>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>

                <div className='user-info-container'>
                    <div className='user-wallet-container'>
                        <h2>Saldo: ${saldo.toFixed(0)}</h2>
                        {showInput ? (
                            <div>
                                <input
                                    type="number"
                                    value={monto}
                                    onChange={handleMontoChange}
                                    placeholder="Ingrese el monto"
                                />
                                <button onClick={handleAddMoney}>Agregar</button>
                            </div>
                        ) : (
                            <button onClick={handleLoadMoney}>Cargar Dinero</button>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

export default Profile