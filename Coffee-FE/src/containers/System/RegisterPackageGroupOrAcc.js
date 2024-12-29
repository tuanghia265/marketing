import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./RegisterPackageGroupOrAcc.css";
import {
  getAllTopics,
  createNewTopicsService,
  updateTopicsService,
  deleteTopicsService,
} from "../../services/topicService";
import { emitter } from "../../utils/emitter";
import ModalTopic from "./ModalTopic";
import ModalEditTopic from "./ModalEditTopic";

class RegisterPackageGroupOrAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTopics: [],
      isOpenModalTopic: false,
      isOpenModalEditTopic: false,
      topicEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllTopicsFromReact();
  }

  AddNewStore = () => {
    this.setState({
      isOpenModalStore: true,
    });
  };

  getAllTopicsFromReact = async () => {
    let response = await getAllTopics("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState(
        {
          arrTopics: response.data.topics,
        },
        () => {
          console.log("Check state topic", this.state.arrTopics);
        }
      );
    }
  };

  AddNewTopic = () => {
    this.setState({
      isOpenModalTopic: true,
    });
  };

  toggleTopicModal = () => {
    this.setState({
      isOpenModalTopic: !this.state.isOpenModalTopic,
    });
  };

  createNewTopic = async (data) => {
    try {
      let response = await createNewTopicsService(data);
      if (response && response.data.errCode !== 0) {
        console.log("Response create topic: ", response.data);
        alert(response.data.errMessage);
      } else {
        await this.getAllTopicsFromReact();
        alert("Thêm thành công");
        this.setState({
          isOpenModalTopic: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("Check data from React: ", data);
  };

  handleDeleteTopic = async (topic) => {
    console.log("Check delete detail", topic);
    try {
      let response = await deleteTopicsService(topic.id);
      if (response.data && response.data.errCode === 0) {
        alert(response.data.errMessage);
        await this.getAllTopicsFromReact();
      } else {
        alert(response.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditTopic = async (topic) => {
    await this.setState({
      isOpenModalEditTopic: true,
      topicEdit: topic,
    });
    console.log("Check update topic ne", this.state.topicEdit);
  };

  doEditTopic = async (topic) => {
    try {
      let response = await updateTopicsService(topic);
      if (response.data && response.data.errCode === 0) {
        alert(response.data.errMessage);
        this.setState({
          isOpenModalEditTopic: false,
        });
        await this.getAllTopicsFromReact();
      } else {
        alert(response.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  toggleEditTopicModal = () => {
    this.setState({
      isOpenModalEditTopic: !this.state.isOpenModalEditTopic,
    });
  };

  render() {
    let arrTopics = this.state.arrTopics;
    console.log("Kiếm tra topic: ", arrTopics);
    return (
      <div className="topic-container">
        <ModalTopic
          isTopicOpen={this.state.isOpenModalTopic}
          toggleFromTopic={this.toggleTopicModal}
          createNewTopic={this.createNewTopic}
        />

        <ModalEditTopic
          isEditTopic={this.state.isOpenModalEditTopic}
          toggleFromTopic={this.toggleEditTopicModal}
          currentTopic={this.state.topicEdit}
          editTopic={this.doEditTopic}
        />
        <div className="title text-center">Quản lý bài viết</div>
        <div className="d-flex justify-content-center mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.AddNewTopic()}
          >
            <i className="fas fa-plus"></i>Thêm bài viết mới
          </button>
        </div>
        <div className="topics-table mt-3 mx-1">
          <table id="topics">
            <thead>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Nội dung phụ</th>
              <th>Tác giả</th>
              <th>Tác vụ</th>
            </thead>
            <tbody>
              {arrTopics &&
                arrTopics.map((item, index) => {
                  console.log("Cophee check map", item, index);
                  return (
                    <tr>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>{item.subContent}</td>
                      <td>{item.author}</td>
                      <td>
                        <button
                          className="btn-update"
                          onClick={() => this.handleEditTopic(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteTopic(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPackageGroupOrAcc);
