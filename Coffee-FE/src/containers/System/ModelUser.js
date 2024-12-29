import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModelUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      roleID: 2,
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        userName: "",
        email: "",
        password: "",
        roleID: 2,
      });
    });
  }

  componentDidMount() {
    console.log("ComponentDidMount");
  }

  toggle = () => {
    this.props.toggleFromParent();
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
    let arrInput = ["userName", "email", "password"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Vui lòng nhập " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = async () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader>Thêm người dùng</ModalHeader>
        <ModalBody>
          <div className="inpurt-container">
            <label>Tên người dùng</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "userName");
              }}
              value={this.state.username}
            />
          </div>
          <div className="inpurt-container">
            <label>Email</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "email");
              }}
              value={this.state.email}
            />
          </div>
          <div className="inpurt-container">
            <label>Mật khẩu</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "password");
              }}
              value={this.state.password}
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
              this.handleAddNewUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModelUser);
