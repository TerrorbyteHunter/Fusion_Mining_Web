
import axios from 'axios';

async function checkStats() {
    try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        console.log('Stats:', response.data);
    } catch (error: any) {
        console.error('Error fetching stats:', error.response?.status, error.response?.data || error.message);
    }
}

checkStats();
