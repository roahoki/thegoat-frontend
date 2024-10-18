
import axios from 'axios';

// Función para confirmar la transacción
export const commitTransaction = async ({ token, request_id }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/webpay/commit`, { token, request_id });
        return response.data;
    } catch (error) {
        console.error('Error during transaction commit:', error);
        throw new Error('Failed to commit transaction');
    }
};
