import axios from 'axios';

const API_URL = 'http://crm-translators.loc/admin/api'; 

export const getTranslators = async (availability = '') => {
    const response = await axios.get(`${API_URL}/translators`, {
        params: {
            availability 
        }
    });
    return response.data;
};
