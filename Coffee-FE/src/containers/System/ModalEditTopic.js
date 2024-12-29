import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      subContent: "",
      author: "",
      id: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({ title: "", content: "", subContent: "", author: "" });
    });
  }

  componentDidMount() {
    let topic = this.props.currentTopic;
    if (topic && !_.isEmpty(topic)) {
      this.setState({
        title: topic.title,
        content: topic.content,
        subContent: topic.subContent,
        author: topic.author,
        id: topic.id,
      });
    }
    console.log("Didmount edit modal", this.props.currentTopic);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentTopic !== prevProps.currentTopic) {
      // Cập nhật lại state từ props khi props thay đổi
      let topic = this.props.currentTopic;
      if (topic && !_.isEmpty(topic)) {
        this.setState({
          title: topic.title,
          content: topic.content,
          subContent: topic.subContent,
          author: topic.author,
          id: topic.id,
        });
      }
      console.log("Update", this.props.currentTopic);
    }
  }

  toggle = () => {
    this.props.toggleFromTopic();
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("Check copy state: ", this.state);
      }
    );
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["title", "content", "author"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Vui lòng nhập " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditTopic = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editTopic(this.state);
    }
  };

  render() {
    console.log("Check props from parent", this.props);
    return (
      <Modal
        isOpen={this.props.isEditTopic}
        toggle={this.toggle}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader>Sửa bài viết</ModalHeader>
        <ModalBody>
          <div className="inpurt-container">
            <label>Tiêu đề</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "title");
              }}
              value={this.state.title}
            />
          </div>
          <div className="inpurt-container">
            <label>Nội dung</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "content");
              }}
              value={this.state.content}
            />
          </div>
          <div className="inpurt-container">
            <label>Nội dung phụ</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "subContent");
              }}
              value={this.state.subContent}
            />
          </div>
          <div className="inpurt-container">
            <label>Tác giả</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "author");
              }}
              value={this.state.author}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-edit-done"
            color="primary"
            onClick={() => {
              this.handleEditTopic();
            }}
          >
            Xong
          </Button>{" "}
          <Button
            className="btn btn-cancel"
            color="secondary"
            onClick={this.toggle}
          >
            Huỷ
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTopic);
