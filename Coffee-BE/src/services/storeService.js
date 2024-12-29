const { where } = require("sequelize");
import { raw } from "body-parser";
import db from "../models";
import { name } from "ejs";

let getAllStore = (storeID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let store = "";
      if (storeID === "ALL") {
        store = db.Store.findAll();
        // store = db.Store.findAll({
        //   attributes: {
        //     exclude: ["userID"],
        //   },
        // });
      }
      if (storeID && storeID !== "ALL") {
        store = await db.Store.findOne({
          where: { id: storeID },
          // attributes: {
          //   exclude: ["userID"],
          // },
        });
      }
      resolve(store);
    } catch (e) {
      reject(e);
    }
  });
};

let checkStoreName = (storeName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let store = await db.Store.findOne({
        where: { name: storeName },
      });
      if (store) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewStore = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkStoreName(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Tên quán đã được đăng ký trước đó. Thử lại!!!",
        });
      }

      let userId = await db.User.findOne({
        where: { id: data.userID },
      });

      if (!userId) {
        resolve({
          errCode: 2,
          errMessage: "ID Chủ quán không tồn tại",
        });
      }

      if (check === false && userId) {
        await db.Store.create({
          name: data.name,
          userID: data.userID,
          image: data.image,
          url: data.url,
          telephone: data.telephone,
          address: data.address,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Xong!!!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let editStore = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Thiếu id quán",
        });
      }
      let store = await db.Store.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (store) {
        store.name = data.name;
        store.image = data.image;
        store.url = data.url;
        (store.telephone = data.telephone),
          (store.address = data.address),
          await store.save();
        resolve({
          errCode: 0,
          errMessage: "Sửa thành công",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy quán cà phê này",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteStore = (storeID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let store = await db.Store.findOne({
        where: { id: storeID },
      });
      if (!store) {
        resolve({
          errCode: 2,
          errMessage: "Người dùng không tồn tại",
        });
      }
      await db.Store.destroy({
        where: { id: storeID },
      });
      resolve({
        errCode: 0,
        errMessage: "Xoá quán cà phê thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailStoreByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "ID không tồn tại",
        });
      } else {
        let data = await db.Store.findOne({
          where: { id: id },
          attributes: {
            exclude: ["image", "url"],
          },
          include: [
            {
              model: db.User,
              attributes: ["userName"],
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllStore: getAllStore,
  createNewStore: createNewStore,
  editStore: editStore,
  deleteStore: deleteStore,
  getDetailStoreByID: getAllStore,
};
