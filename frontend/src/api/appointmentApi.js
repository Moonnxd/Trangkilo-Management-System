import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

// get all appointments
export const getAppointments = () => axios.get(API_URL);