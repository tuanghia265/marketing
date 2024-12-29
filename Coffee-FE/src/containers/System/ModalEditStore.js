import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ProductManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
import { CommonUtils } from "../../utils";

class ModalEditStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      image: "",
      userID: "",
      url: "",
      telephone: "",
      address: "",
      userName: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        id: "",
        name: "",
        image: "",
        userID: "",
        url: "",
      });
    });
  }

  componentDidMount() {
    let store = this.props.currentStore;
    let imageBase64 = "";
    if (store.image) {
      imageBase64 = new Buffer(store.image, `base64`).toString("binary");
    }
    if (store && !_.isEmpty(store)) {
      this.setState({
        id: store.id,
        name: store.name,
        image: imageBase64,
        userID: store.userID,
        url: store.url,
        telephone: store.telephone,
        address: store.address,
      });
    }
    console.log("Didmount edit modal", this.props.currentStore);
  }

  toggle = () => {
    this.props.toggleFromStore();
  };

  // handleOnchangeInput = (event, id) => {
  //   let copyState = { ...this.state };
  //   copyState[id] = event.target.value;
  //   this.setState(
  //     {
  //       ...copyState,
  //     },
  //     () => {
  //       console.log("Check copy store state: ", this.state);
  //     }
  //   );
  // };
  handleOnchangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeTelephone = (event) => {
    this.setState({
      telephone: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeURL = (event) => {
    this.setState({
      url: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("BASE 64 IMG: ", base64);
      let imageURL = URL.createObjectURL(file);
      this.setState({
        image: base64,
      });
    }
    console.log("Image data: ", this.state.previewImg);
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["name", "address", "telephone"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Vui lòng nhập " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditStore = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editStore(this.state);
    }
  };

  render() {
    console.log("Check props from parent", this.props);
    return (
      <Modal
        isOpen={this.props.isStoreOpen}
        toggle={this.toggle}
        className={"modal-store-container"}
        size="lg"
        centered
      >
        <ModalHeader>Sửa thông tin quán cà phê</ModalHeader>
        <ModalBody>
          <div className="inpurt-container">
            <label>Tên quán</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeName(event);
              }}
              value={this.state.name}
            />
          </div>
          <div className="inpurt-container">
            <label>Hình ảnh</label>
            <input
              id="image-upload"
              type="file"
              onChange={this.handleOnchangeImage}
            />
            <label>Đường dẫn ảnh</label>
            <input type="text" value={this.state.image} readOnly />
            <div
              className="image-preview"
              style={{ backgroundImage: `url(${this.state.image})` }}
            >
              {/* <img src={this.state.image} alt="Store-image"></img> */}
            </div>
          </div>

          <div className="inpurt-container">
            <label>URL</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeURL(event);
              }}
              value={this.state.url}
            />
          </div>

          <div className="inpurt-container">
            <label>Số điện thoại</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeTelephone(event);
              }}
              value={this.state.telephone}
            />
          </div>

          <div className="inpurt-container">
            <label>Địa chỉ</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeAddress(event);
              }}
              value={this.state.address}
            />
          </div>

          <div className="inpurt-container">
            <label>ID Chủ quán</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "userID");
              }}
              value={this.state.userID}
              disabled
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-edit-done"
            color="primary"
            onClick={() => {
              this.handleEditStore();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditStore);
