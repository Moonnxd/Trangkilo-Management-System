import axios from "axios";

const API_URL = "http://localhost:5000/api/branches";

export const getBranch = () => axios.get(API_URL);