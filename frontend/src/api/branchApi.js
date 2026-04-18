import axios from "axios";

//base branch url
const API_URL = "http://localhost:5000/api/branches";

//display all branches
export const getBranches = () => axios.get(API_URL);

//display branch summary
export const getBranchSalesSummary = () => axios.get(`${API_URL}/branchSalesSummary`);

//get branch info based in branch_id
export const getBranch = (id) => axios.get(`${API_URL}/${id}`);

//add new branch
export const addBranch = (data) => {
  return axios.post(`${API_URL}`, data);
};

//update branch details
export const updateBranch = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

//delete a role
export const deleteBranch = (id) => axios.delete(`${API_URL}/${id}`);