import React, { Component } from "react";
import "./RecommandList.css";
import RecommandBox from "./RecommandBox/RecommandBox";
import { getAllStores } from "../../../services/storeService";
import ModalStoreView from "../ModalStoreView/ModalStoreView";

class RecommandList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStores: [],
      isOpenModalView: false,
      storeInfo: {},
    };
  }

  async componentDidMount() {
    await this.getAllStoresLocation();
  }

  getAllStoresLocation = async () => {
    let response = await getAllStores("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState(
        {
          arrStores: response.data.store,
        },
        () => {
          console.log("Check state stores", this.state.arrStores);
        }
      );
    }
  };

  getTopicStoreLocation = async (store) => {
    await this.setState({
      storeInfo: store,
      isOpenModalView: true,
    });
    console.log("Đã chọn: ", this.state.storeInfo);
  };

  viewTopicStore = (store) => {
    this.setState({
      isOpenModalView: false,
    });
  };

  toggleStoreModal = () => {
    this.setState({
      isOpenModalView: !this.state.isOpenModalView,
    });
  };

  render() {
    let arrStores = this.state.arrStores;
    let recommandStoreCL1 = arrStores.slice(0, 3);
    let recommandStoreCL2 = arrStores.slice(3, 6);
    return (
      <div className="recommand-container">
        <ModalStoreView
          isModalOpen={this.state.isOpenModalView}
          currentStore={this.state.storeInfo}
          toggleFromStore={this.toggleStoreModal}
        />
        <div className="recommand-column-1">
          {/* <div className="item recommand-1">
            <RecommandBox />
          </div>
          <div className="item recommand-2">
            <RecommandBox />
          </div>
          <div className="item recommand-3">
            <RecommandBox />
          </div> */}
          {recommandStoreCL1 &&
            recommandStoreCL1.length > 0 &&
            recommandStoreCL1.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <div>
                  <div
                    className="recommand-body"
                    onClick={() => this.getTopicStoreLocation(item)}
                  >
                    <div
                      className="recommand-img"
                      style={{ backgroundImage: `url(${imageBase64})` }}
                    ></div>
                    <div className="recommand-name">{item.name}</div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="recommand-column-2">
          {/* <div className="item recommand-4">
            <RecommandBox />
          </div>
          <div className="item recommand-5">
            <RecommandBox />
          </div>
          <div className="item recommand-6">
            <RecommandBox />
          </div> */}
          {recommandStoreCL2 &&
            recommandStoreCL2.length > 0 &&
            recommandStoreCL2.map((item, index) => {
              let imageBase64 = "";
              if (item.image) {
                imageBase64 = new Buffer(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <div>
                  <div
                    className="recommand-body"
                    onClick={() => this.getTopicStoreLocation(item)}
                  >
                    <div
                      className="recommand-img"
                      style={{ backgroundImage: `url(${imageBase64})` }}
                    ></div>
                    <div className="recommand-name">{item.name}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default RecommandList;
