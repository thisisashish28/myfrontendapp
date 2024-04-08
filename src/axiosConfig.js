import axios from "axios";

axios.defaults.baseURL = 
process.env.NODE_ENV === 'https://mybackendapp-6gt6.onrender.com/';