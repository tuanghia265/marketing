const { where } = require("sequelize");
const db = require("../models");
const { raw } = require("body-parser");

let getTopic = (topicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (topicId === "ALL") {
        let topics = await db.Topic.findAll({
          where: { id: topicId },
          attributes: {
            exclude: ["content"],
          },
          raw: true,
        });
        resolve({
          errCode: 0,
          list: topics,
        });
        if (topicId && topicId !== "ALL") {
          let topic = await db.Topic.findOne({
            where: { id: topicId },
            attributes: {},
            raw: true,
          });
          resolve({
            errCode: 0,
            topic: topic,
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllTopic = (topicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let topics = "";
      if (topicId === "ALL") {
        topics = await db.Topic.findAll({
          attributes: {},
        });
      }
      if (topicId && topicId !== "ALL") {
        topics = await db.Topic.findOne({
          where: { id: topicId },
          attributes: {},
        });
      }
      resolve(topics);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTopic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.content) {
        resolve({
          errCode: 2,
          errMessage: "Vui lòng nhập nội dung",
        });
      }
      if (data.content) {
        await db.Topic.create({
          title: data.title,
          subContent: data.subContent,
          content: data.content,
          author: data.author,
          storeID: data.storeID,
        });
        resolve({
          errCode: 0,
          errMessage: "Thành công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTopic = (topicID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let topic = await db.Topic.findOne({
        where: { id: topicID },
      });
      if (!topic) {
        resolve({
          errCode: 2,
          errMessage: "Bài viết không tồn tại",
        });
      }
      await db.Topic.destroy({
        where: { id: topicID },
      });
      resolve({
        errCode: 0,
        errMessage: "Xoá bài viết thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateTopic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Id bài viết không hợp lệ",
        });
      }
      let topic = await db.Topic.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (topic) {
        topic.title = data.title;
        topic.subContent = data.subContent;
        topic.content = data.content;
        topic.author = data.author;
        await topic.save();
        resolve({
          errCode: 0,
          errMessage: "Cập nhật thành công",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy bài viết",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTopic: getAllTopic,
  createNewTopic: createNewTopic,
  deleteTopic: deleteTopic,
  updateTopic: updateTopic,
};
