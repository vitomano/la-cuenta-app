import axios from "axios";

const baseURL = 'http://localhost:4000/api'
// const baseURL = process.env.REACT_APP_API_URL


const lacuentaApi = axios.create({
    baseURL: baseURL
}) 

lacuentaApi.interceptors.request.use(

    async(config) => {
        const token = localStorage.getItem('token')

        if(token){
            config.headers!['x-token'] = token;
        } 
        return config;
    }
);

export default lacuentaApi