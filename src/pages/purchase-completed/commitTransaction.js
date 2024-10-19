
import axios from 'axios';

// Función para confirmar la transacción
export const commitTransaction = async ({ token }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/webpay/commit`, { token });
        return response.data;
    } catch (error) {
        console.error('Error during transaction commit:', error);
        throw new Error('Failed to commit transaction');
    }
};
