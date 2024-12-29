import axios from "axios";

const getAllTopics = (topicId) => {
  return axios.get(`http://localhost:8000/api/get-all-topic?id=${topicId}`);
};

const createNewTopicsService = (data) => {
  return axios.post("http://localhost:8000/api/create-new-topic", data);
};

const updateTopicsService = (inputData) => {
  return axios.put("http://localhost:8000/api/edit-topic", inputData);
};

const deleteTopicsService = (topicID) => {
  return axios.delete("http://localhost:8000/api/delete-topic", {
    data: {
      id: topicID,
    },
  });
};

export {
  getAllTopics,
  createNewTopicsService,
  updateTopicsService,
  deleteTopicsService,
};
