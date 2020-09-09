import axios from 'axios';

const localDbUrl = axios.create({
    baseURL: 'http://localhost:54684/page'
})

export default localDbUrl;