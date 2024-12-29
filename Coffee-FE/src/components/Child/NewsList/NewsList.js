import React, { Component } from "react";
import "./NewsList.css";
import { extendWith } from "lodash";
import AvtNewsBox from "../../../assets/about-us-image.png";
import { getAllStores } from "../../../services/storeService";
import ModalStoreView from "../ModalStoreView/ModalStoreView";

import { getAllTopics } from "../../../services/topicService";
import ModalTopicView from "../ModalTopicView/ModalTopicView";

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // arrStores: [],
      isOpenModalView: false,
      // storeInfo: {},
      arrTopics: [],
      topicInfo: {},
      image: AvtNewsBox,
    };
  }

  async componentDidMount() {
    await this.getAllTopicsFromReact();
  }

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

  getTopicLocation = async (topic) => {
    await this.setState({
      topicInfo: topic,
      isOpenModalView: true,
    });
    console.log("Đã chọn: ", this.state.topicInfo);
  };

  viewTopic = (topic) => {
    this.setState({
      isOpenModalView: false,
    });
  };

  toggleTopicModal = () => {
    this.setState({
      isOpenModalView: !this.state.isOpenModalView,
    });
  };

  render() {
    let arrTopics = this.state.arrTopics;
    return (
      <div className="news-cf-scroll">
        <ModalTopicView
          isModalOpen={this.state.isOpenModalView}
          currentTopic={this.state.topicInfo}
          toggleFromTopic={this.toggleTopicModal}
        />
        {arrTopics &&
          arrTopics.length > 0 &&
          arrTopics.map((item, index) => {
            return (
              <div>
                <div
                  className="news-body"
                  onClick={() => this.getTopicLocation(item)}
                >
                  <div
                    className="news-avt"
                    style={{ backgroundImage: `url(${this.state.image})` }}
                  ></div>
                  <div className="news-title">{item.title}</div>
                  <div className="news-content">{item.content}</div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default NewsList;
