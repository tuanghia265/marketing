import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      userName: "",
      email: "",
      //   password: "",
      roleID: 1,
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        userName: "",
        email: "",
        // password: "",
        roleID: 2,
      });
    });
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        userName: user.userName,
        email: user.email,
        // password: user.password,
        roleID: user.roleID,
      });
    }
    console.log("Didmount edit modal", this.props.currentUser);
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
    let arrInput = ["userName", "email"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Vui lòng nhập " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    console.log("Check props from parent", this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader>Sửa thông tin người dùng</ModalHeader>
        <ModalBody>
          <div className="inpurt-container">
            <label>Tên người dùng</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "userName");
              }}
              value={this.state.userName}
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
              disabled
            />
          </div>
          {/* <div className="inpurt-container">
            <label>Mật khẩu</label>
            <input
              type="text"
              onChange={(event) => {
                this.handleOnchangeInput(event, "password");
              }}
              value={this.state.password}
            />
          </div> */}
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
            className="btn btn-edit-done"
            color="primary"
            onClick={() => {
              this.handleEditUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
