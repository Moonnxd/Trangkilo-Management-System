import axios from "axios";

const API_URL = "http://localhost:5000/api/roles";

export const getRoles = () => axios.get(API_URL);

// get role info based in role_id
export const getRole = (id) => axios.get(`${API_URL}/${id}`);

//add new role
export const addRole = (data) => {
    return axios.post(`${API_URL}`, data);
  };
  
//update role details
export const updateRole = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

//delete a role
export const deleteRole = (id) => axios.delete(`${API_URL}/${id}`);
