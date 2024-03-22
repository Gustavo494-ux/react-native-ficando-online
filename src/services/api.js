import  axios  from "axios";

const ip = '192.168.0.102';
const porta = '3000';

const api = axios.create({
    baseURL: `http://${ip}:${porta}/`
})

export default api;