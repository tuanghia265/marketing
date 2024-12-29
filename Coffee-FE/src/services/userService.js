import axios from "axios";

const handleLogin = (email, password) => {
  //post dữ liệu người dùng nhập vào về phía server
  return axios.post("http://localhost:8000/api/login", { email, password });
};

const handleAdminLogin = (email, password) => {
  return axios.post("http://localhost:8000/api/admin-login", {
    email,
    password,
  });
};

const handleResigter = (userName, email, password, roleID) => {
  roleID = 1;
  return axios.post("http://localhost:8000/api/create-new-user", {
    userName,
    email,
    password,
    roleID,
  });
};

const handleCreateNewUser = (data) => {
  return axios.post("http://localhost:8000/api/create-new-user", data);
};

const getAllUsers = (inputId) => {
  return axios.get(`http://localhost:8000/api/get-all-user?id=${inputId}`);
};

const deleteUserService = (userId) => {
  return axios.delete("http://localhost:8000/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const updateUserService = (inputData) => {
  return axios.put("http://localhost:8000/api/edit-user", inputData);
};

export {
  handleLogin,
  handleResigter,
  handleAdminLogin,
  getAllUsers,
  handleCreateNewUser,
  deleteUserService,
  updateUserService,
};
