import axios from "axios";

axios.defaults.baseURL = 
process.env.NODE_ENV !== 'https://mybackendapp-r0e0.onrender.com/' ? 'http://localhost:5000': '/';