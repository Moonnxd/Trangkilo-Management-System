import axios from "axios";

const API_URL = "http://localhost:5000/api/staffs";

export const getStaffs = () => axios.get(API_URL);
export const getStaff = (id) => axios.get(`${API_URL}/${id}`);
export const updateStaff = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const deleteStaff = (id) => axios.delete(`${API_URL}/${id}`);