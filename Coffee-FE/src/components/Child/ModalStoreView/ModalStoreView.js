import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalStoreView.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import { getAllUsers } from "../../../services/userService";
import { getAllStores } from "../../../services/storeService";
import Footer from "../../Footer/footer";
import _ from "lodash";

class ModalProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      username: "",
      storename: "",
      content: "",
      telephone: "",
      address: "",
      image: "",
      store: {},
      userID: "",
    };
  }

  async componentDidMount() {
    let user = await getAllUsers("ALL");
    let storeInfo = this.props.currentStore;
    let imageBase64 = "";
    if (storeInfo.image) {
      imageBase64 = new Buffer(storeInfo.image, `base64`).toString("binary");
    }
    if (storeInfo && !_.isEmpty(storeInfo)) {
      this.setState({
        storename: storeInfo.name,
        image: imageBase64,
        arrUser: user,
        store: storeInfo,
        telephone: storeInfo.telephone,
        address: storeInfo.address,
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.isModalOpen && !prevProps.isModalOpen) {
      let user = await getAllUsers("ALL");
      let storeInfo = this.props.currentStore;
      let imageBase64 = "";
      if (storeInfo.image) {
        imageBase64 = new Buffer(storeInfo.image, `base64`).toString("binary");
      }
      if (storeInfo && !_.isEmpty(storeInfo)) {
        this.setState({
          storename: storeInfo.name,
          image: imageBase64,
          arrUser: user,
          store: storeInfo,
          telephone: storeInfo.telephone,
          address: storeInfo.address,
        });
        console.log("store: ", storeInfo.name);
        console.log("Người dùng: ", this.state.arrUser);
      }
    }
  }

  toggle = () => {
    this.props.toggleFromStore();
  };

  render() {
    let arrUser = this.state.arrUser;
    let store = this.state.store;
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
          Thông tin quán cà phê {this.state.storename}
        </ModalHeader>
        <ModalBody>
          <div className="storev-name">{this.state.storename}</div>
          <div
            className="storev-img"
            style={{ backgroundImage: `url(${this.state.image})` }}
          ></div>
          <div className="store-info">
            {arrUser &&
              arrUser.length > 0 &&
              arrUser.map((item, index) => {
                if (item.id === store.userID) {
                  this.setState({
                    username: item.name,
                  });
                  return (
                    <div className="info username-info">
                      {this.state.username}
                    </div>
                  );
                }
              })}
            <div className="info telephone-info">
              Liên hệ: {this.state.telephone}
            </div>
            <div className="info address-info">
              Địa chỉ: {this.state.address}
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
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
