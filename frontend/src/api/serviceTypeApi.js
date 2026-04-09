import axios from "axios";

const API_URL = "http://localhost:5000/api/serviceType";

export const getServiceType = () => axios.get(API_URL);