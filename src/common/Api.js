import axios from "axios";

let baseURL = 'http://localhost:3000/';

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const { origin } = new URL(config.url);
    const allowedOrigins = [baseURL];

    if(allowedOrigins.includes(origin+'/')){
        config.headers.authorization = token;
    }

    return config;
    },

    error => { return Promise.reject(error); }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error)
        if(error.message === "Request failed with status code 401"){

            localStorage.removeItem("token");
            window.location.replace("http://localhost:5000/login-user");

        }
    }
)

var FetchData = (url, method = "GET") => {
    return async (method, data) => {
        return await axios({
            method : method,
            url : baseURL + url,
            data,
            responseType : "json"
        });
        
    }
}
export default FetchData ;