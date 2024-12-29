import storeService from "../services/storeService";

let handleGetAllStore = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      store: [],
    });
  }
  let store = await storeService.getAllStore(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Done",
    store,
  });
};

let handleCreateNewStore = async (req, res) => {
  let message = await storeService.createNewStore(req.body);
  return res.status(200).json(message);
};

// let handleEditStore=async(req,res)=>{
//     let message = await storeService.editStore(req.body);
//     return res.status(200).json(message);
// }

let handleEditStore = async (req, res) => {
  let data = req.body;
  let message = await storeService.editStore(data);
  return res.status(200).json({
    errCode: message.errCode,
    errMessage: message.errMessage,
  });
};

let handleDeleteStore = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }

  let message = await storeService.deleteStore(req.body.id);
  return res.status(200).json(message);
};

let handleGetDetailStoreByID = async (req, res) => {
  try {
    let infor = await storeService.getDetailStoreByID(req.query.id);
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
  handleGetAllStore: handleGetAllStore,
  handleCreateNewStore: handleCreateNewStore,
  handleEditStore: handleEditStore,
  handleDeleteStore: handleDeleteStore,
  handleGetDetailStoreByID: handleGetDetailStoreByID,
};
