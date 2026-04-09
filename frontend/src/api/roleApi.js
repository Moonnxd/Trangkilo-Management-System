import axios from "axios";

const API_URL = "http://localhost:5000/api/roles";

export const getRole = () => axios.get(API_URL);
