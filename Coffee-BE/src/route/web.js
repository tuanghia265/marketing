import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import storeController from "../controllers/storeController";
import topicController from "../controllers/topicController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.editCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/del-crud", homeController.delCRUD);

  //Users
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.getAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.post("/api/admin-login", userController.handleAdminLogin);
  router.get("/api/get-detail-user", userController.handleGetUserById);

  //Stores
  router.get("/api/get-all-store", storeController.handleGetAllStore);
  router.post("/api/create-new-store", storeController.handleCreateNewStore);
  router.put("/api/edit-store", storeController.handleEditStore);
  router.delete("/api/delete-store", storeController.handleDeleteStore);
  router.get("/api/get-detail-store", storeController.handleGetDetailStoreByID);

  //Topics
  router.get("/api/get-all-topic", topicController.handleGetAllTopic);
  router.post("/api/create-new-topic", topicController.handleCreateNewTopic);
  router.put("/api/edit-topic", topicController.handleEditTopic);
  router.delete("/api/delete-topic", topicController.handleDeleteTopic);

  return app.use("/", router);
};

module.exports = initWebRoutes;
