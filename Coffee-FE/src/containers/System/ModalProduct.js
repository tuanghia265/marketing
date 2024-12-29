import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { every } from "lodash";
import { CommonUtils } from "../../utils";
import { getAllUsers } from "../../services/userService";

class ModalProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      userID: "",
      url: "",
      telephone: "",
      address: "",
      previewImg: "",
      arrId: [],
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        name: "",
        image: "",
        userID: "",
        url: "",
        telephone: "",
        address: "",
        previewImg: "",
      });
    });
  }

  componentDidMount() {
    console.log("ComponentDidMount");
    this.getAllIdUser();
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
  //       console.log("Check copy state: ", this.state);
  //     }
  //   );
  // };

  //Lấy biến name
  handleOnchangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
    console.log(event.target.value);
  };

  //Lấy biến userID
  handleOnchangeIDUser = (event) => {
    this.setState({
      userID: event.target.value,
    });
    console.log(event.target.value);
  };

  //Lấy biến url
  handleOnchangeURL = (event) => {
    this.setState({
      url: event.target.value,
    });
    console.log(event.target.value);
  };

  // Lấy biến image
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

  //Kiểm tra thông tin đã nhập đầy đủ chưa
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["name", "userID", "address", "telephone"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Vui lòng nhập " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  //Thêm quán cà phê mới
  handleAddNewStore = async () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.createNewStore(this.state);
    }
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

  getAllIdUser = async () => {
    let response = await getAllUsers("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState({
        arrId: response.data.users,
      });
      console.log("Check all ID: ", this.state.arrId);
    }
  };

  render() {
    let arrId = this.state.arrId;
    return (
      <Modal
        isOpen={this.props.isStoreOpen}
        toggle={this.toggle}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader>Thêm quán cà phê mới</ModalHeader>
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
            <label>Id chủ quán</label>
            {/* <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeIDUser(event);
              }}
              value={this.state.userID}
            /> */}
            <select
              className="form-control"
              onChange={(event) => {
                this.handleOnchangeIDUser(event);
              }}
              value={this.state.userID}
            >
              {arrId &&
                arrId.length > 0 &&
                arrId.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      ID: {item.id}, Chủ quán: {item.userName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="inpurt-container">
            <label>Ảnh</label>
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
            <label>URL</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeURL(event);
              }}
              value={this.state.url}
            />
          </div>
          {/* <div className="inpurt-container">
            <label>Phân quyền</label>
            <select name="roleId" class="form-control">
              <option value={this.state.roleId}>Admin</option>
              <option value={this.state.roleId}>Guest</option>
              <option value={this.state.roleId}>Host</option>
            </select>
          </div> */}
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-add-done"
            color="primary"
            onClick={() => {
              this.handleAddNewStore();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
