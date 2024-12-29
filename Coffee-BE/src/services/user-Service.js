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
          attributes: ["email", "roleID", "password"],
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
          } else {
            userData.errCode = 3;
            userData.errMessage = "Sai mật khẩu!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "Thông tin người dùng chưa được đăng ký!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email chưa đăng ký! Thử lại";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let handleAdminLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleID", "password"],
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
          } else {
            userData.errCode = 3;
            userData.errMessage = "Sai mật khẩu!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "Thông tin người dùng chưa được đăng ký!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email chưa đăng ký! Thử lại";
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

// let checkRole = (userEmail) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let user = await db.User.findOne({
//         where: { email: userEmail },
//       });
//       if (user) {
//         if (roleID != 0) {
//           resolve(false);
//         } else {
//           resolve(true);
//         }
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

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
      if (!data.email || !data.password || !data.userName) {
        resolve({
          errCode: 2,
          errMessage: "Vui lòng nhập đầy đủ thông tin!",
        });
      }
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Email này đã được đăng ký. Vui lòng thử lại email khác",
        });
      }
      let hashPwdFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        userName: data.userName,
        email: data.email,
        password: hashPwdFromBcrypt,
        roleID: data.roleID,
      });
      resolve({
        errCode: 0,
        errMessage: "Thành công",
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
          errMessage: "Người dùng không tồn tại",
        });
      }
      await db.User.destroy({
        where: { id: userID },
      });
      resolve({
        errCode: 0,
        errMessage: "Xoá người dùng thành công",
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
          errMessage: "Id người dùng không hợp lệ",
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
          errMessage: "Cập nhật thành công",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy người dùng",
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

let getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "ID không tồn tại",
        });
      } else {
        let userInfor = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["avatar", "password", "roleType"],
          },
          include: [
            {
              model: db.Store,
              attributes: ["name"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          infor: userInfor,
        });
      }
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
  checkUserEmail: checkUserEmail,
  handleUserLogin: handleUserLogin,
  handleAdminLogin: handleAdminLogin,
  getUserById: getUserById,
};
