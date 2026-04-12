import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

// get all appointments
export const getAppointments = () => axios.get(API_URL);

export const updateAppointment = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteAppointment = (id) =>
  axios.delete(`${API_URL}/${id}`);