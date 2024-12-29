import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);
const { where } = require("sequelize");

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleType", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            (userData.errCode = 0),
              (userData.errMessage = "Hợp lệ"),
              delete user.password;
            userData.user = user;
            userData.statusCode = 200;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Sai mật khẩu!";
            userData.statusCode = 500;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "Thông tin người dùng chưa được đăng ký!";
          userData.statusCode = 500;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email chưa đăng ký! Thử lại";
        userData.statusCode = 500;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserPassword = () => {
  return new Promise((resolve, reject) => {
    try {
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userID === "ALL") {
        users = db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userID && userID !== "ALL") {
        users = await db.User.findOne({
          where: { id: userID },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Email is already, Pls try with another email",
        });
      }
      let hashPwdFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        userName: data.userName,
        email: data.email,
        password: hashPwdFromBcrypt,
        roleType: data.roleType,
      });
      resolve({
        errCode: 0,
        errMessage: "Done",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userID },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "The user isn't exist",
        });
      }
      await db.User.destroy({
        where: { id: userID },
      });
      resolve({
        errCode: 0,
        errMessage: "User has been deleted",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.userName = data.userName;
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Successful update!!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = async (pwd) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(pwd, salt);
      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  hashUserPassword: handleUserLogin,
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
