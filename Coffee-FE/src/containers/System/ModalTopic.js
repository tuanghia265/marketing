import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { every } from "lodash";
import { CommonUtils } from "../../utils";
import { getAllTopics } from "../../services/topicService";

class ModalTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      subContent: "",
      author: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({ title: "", content: "", subContent: "", author: "" });
    });
  }
  componentDidMount() {
    console.log("ComponentDidMount");
  }
  toggle = () => {
    this.props.toggleFromTopic();
  };

  handleOnchangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeContent = (event) => {
    this.setState({
      content: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeSubContent = (event) => {
    this.setState({
      subContent: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeAuthor = (event) => {
    this.setState({
      author: event.target.value,
    });
    console.log(event.target.value);
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

  handleAddNewTopic = async () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.createNewTopic(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isTopicOpen}
        toggle={this.toggle}
        size="lg"
        centered
        className={"modal-user-container"}
      >
        <ModalHeader>Thêm quán cà phê mới</ModalHeader>
        <ModalBody>
          <div className="inpurt-container">
            <label>Tiêu đề</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeTitle(event);
              }}
              value={this.state.title}
            />
          </div>
          <div className="inpurt-container">
            <label>Nội dung</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeContent(event);
              }}
              value={this.state.content}
            />
          </div>
          <div className="inpurt-container">
            <label>Nội dung phụ</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeSubContent(event);
              }}
              value={this.state.subContent}
            />
          </div>
          <div className="inpurt-container">
            <label>Tác giả</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeAuthor(event);
              }}
              value={this.state.author}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-add-done"
            color="primary"
            onClick={() => {
              this.handleAddNewTopic();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalTopic);
