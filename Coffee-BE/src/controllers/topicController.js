import topicService from "../services/topicService";
let handleGetAllTopic = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      topics: [],
    });
  }
  let topics = await topicService.getAllTopic(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Done",
    topics,
  });
};

let handleCreateNewTopic = async (req, res) => {
  let message = await topicService.createNewTopic(req.body);
  return res.status(200).json({
    errCode: message.errCode,
    errMessage: message.errMessage,
  });
};

let handleEditTopic = async (req, res) => {
  let data = req.body;
  let message = await topicService.updateTopic(data);
  return res.status(200).json({
    errCode: message.errCode,
    errMessage: message.errMessage,
  });
};

let handleDeleteTopic = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await topicService.deleteTopic(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllTopic: handleGetAllTopic,
  handleCreateNewTopic: handleCreateNewTopic,
  handleEditTopic: handleEditTopic,
  handleDeleteTopic: handleDeleteTopic,
};
