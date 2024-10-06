import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Bonds = () => {
    const { user, isAuthenticated } = useAuth0();
    const [sessionToken, setSessionToken] = useState('');

    useEffect(() => {
        // Guardar un valor en localStorage
        localStorage.setItem('sessionToken', 'your-session-token');

        // Leer el valor de localStorage
        const token = localStorage.getItem('sessionToken');
        setSessionToken(token);
    }, []);

    return (
        <div>
            {sessionToken}
            
        </div>
    );
};

export default Bonds;