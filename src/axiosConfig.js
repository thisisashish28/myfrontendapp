import axios from "axios";

axios.defaults.baseURL = 
process.env.NODE_ENV !==   'http://localhost:5000' ? 'https://mybackendapp-s4p3.onrender.com': '/';