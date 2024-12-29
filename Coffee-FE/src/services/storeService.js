import axios from "axios";

const getAllStores = (storeID) => {
  return axios.get(`http://localhost:8000/api/get-all-store?id=${storeID}`);
};

const createNewStoreService = (data) => {
  return axios.post("http://localhost:8000/api/create-new-store", data);
};

const updateStoreService = (inputData) => {
  return axios.put("http://localhost:8000/api/edit-store", inputData);
};

const deleteStoreService = (storeID) => {
  return axios.delete("http://localhost:8000/api/delete-store", {
    data: {
      id: storeID,
    },
  });
};

export {
  getAllStores,
  createNewStoreService,
  updateStoreService,
  deleteStoreService,
};
