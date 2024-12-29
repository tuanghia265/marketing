import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalTopicView.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";

import { getAllTopics } from "../../../services/topicService";
import Footer from "../../Footer/footer";
import _ from "lodash";
import NewsAvtBox from "../../../assets/about-us-image.png";

class ModalProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      topic: {},
      subContent: "",
      author: "",
      image: NewsAvtBox,
    };
  }
  async componentDidMount() {
    let topicInfo = this.props.currenTopic;
    if (topicInfo && !_.isEmpty(topicInfo)) {
      this.setState({
        title: topicInfo.title,
        content: topicInfo.content,
        subContent: topicInfo.content,
        author: topicInfo.author,
        topic: topicInfo,
      });
    }
    console.log("Check news:", this.state);
  }
  async componentDidUpdate(prevProps) {
    if (this.props.isModalOpen && !prevProps.isModalOpen) {
      let topicInfo = this.props.currentTopic;
      if (topicInfo && !_.isEmpty(topicInfo)) {
        this.setState({
          title: topicInfo.title,
          content: topicInfo.content,
          subContent: topicInfo.content,
          author: topicInfo.author,
          topic: topicInfo,
        });
      }
    }
  }
  toggle = () => {
    this.props.toggleFromTopic();
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        toggle={this.toggle}
        className={"modal-topic-view custom-modal"}
        centered
        size="lg"
        scrollable
      >
        <ModalHeader
          className="topic-header"
          style={{
            backgroundColor: "#381b07",
          }}
        >
          Bài viết {this.state.title}
        </ModalHeader>
        <ModalBody>
          <div className="news-title-md">{this.state.title}</div>
          <div
            className="news-backgroundImg"
            style={{ backgroundImage: `url(${this.state.image})` }}
          ></div>
          <div className="news-content-md">{this.state.content}</div>
          <div className="footer">
            <Footer />
          </div>
        </ModalBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
