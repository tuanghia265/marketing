import db from "../models/index";
import CRUDService from "../services/CRUD-Service";
import userService from "../services/user-Service";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "Email hoặc mật khẩu trống!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let getAllUser = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      users: [],
    });
  }
  let users = await userService.getAllUser(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Done",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json({
    errCode: message.errCode,
    errMessage: message.errMessage,
  });
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json({
    errCode: message.errCode,
    errMessage: message.errMessage,
  });
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }

  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let handleAdminLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let roleId = req.body.roleId;

  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "Email hoặc mật khẩu trống!",
    });
  }

  let userData = await userService.handleAdminLogin(email, password);
  console.log(userData);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetUserById = async (req, res) => {
  try {
    let infor = await userService.getUserById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  getAllUser: getAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  handleAdminLogin: handleAdminLogin,
  handleGetUserById: handleGetUserById,
};
