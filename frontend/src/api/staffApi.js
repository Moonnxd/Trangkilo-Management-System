import axios from "axios";

const API_URL = "http://localhost:5000/staffs";

//display staffs summary details
export const getStaffs = () => axios.get(API_URL);

export const getTherapist = () => axios.get(`${API_URL}/therapist`);

//get staff info, assigned branch and assigned role
export const getStaff = (id) => axios.get(`${API_URL}/${id}`);

//add new staff
export const createStaff = (data) => {
  return axios.post(`${API_URL}`, data);
};

//update staff details
export const updateStaff = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

//delete a staff
export const deleteStaff = (id) => axios.delete(`${API_URL}/${id}`);


