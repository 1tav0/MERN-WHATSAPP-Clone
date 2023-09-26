import axios from 'axios'; 

const instance = axios.create({
    // baseURL: 'http://localhost:9000',
    baseURL: 'https://whatsapp-mernbackend-ed84e679ed10.herokuapp.com',
});

export default instance;