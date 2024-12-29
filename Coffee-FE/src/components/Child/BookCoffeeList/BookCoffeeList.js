import React, { Component } from "react";
import BookCoffeeBox from "./BookCoffeeBox/BookCoffeeBox";
import "./BookCoffeeList.css";
import { extendWith } from "lodash";
import { getAllStores } from "../../../services/storeService";
import ModalStoreView from "../ModalStoreView/ModalStoreView";

class BookCoffeeList extends Component {
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
    return (
      <div className="book-cf-scroll">
        <ModalStoreView
          isModalOpen={this.state.isOpenModalView}
          currentStore={this.state.storeInfo}
          toggleFromStore={this.toggleStoreModal}
        />
        {arrStores &&
          arrStores.length > 0 &&
          arrStores.map((item, index) => {
            let imageBase64 = "";
            if (item.image) {
              imageBase64 = new Buffer(item.image, "base64").toString("binary");
            }
            return (
              <div>
                <div
                  className="bookCD-body"
                  onClick={() => this.getTopicStoreLocation(item)}
                >
                  <div
                    className="bookCF-image"
                    style={{ backgroundImage: `url(${imageBase64})` }}
                  ></div>
                  <div className="bookCF-name">{item.name}</div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default BookCoffeeList;
