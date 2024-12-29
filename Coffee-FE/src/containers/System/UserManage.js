import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  handleCreateNewUser,
  deleteUserService,
  updateUserService,
} from "../../services/userService";
import ModelUser from "./ModelUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  AddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await handleCreateNewUser(data);
      if (response && response.data.errCode !== 0) {
        console.log("Response create user: ", response.data);
        alert(response.data.errMessage);
      } else {
        await this.getAllUserFromReact();
        alert("Thêm thành công");
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("Check data from React: ", data);
  };

  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState(
        {
          arrUsers: response.data.users,
        },
        () => {
          console.log("Check state users", this.state.arrUsers);
        }
      );
    }
    // console.log("Get users from node.js", this.state.arrUsers);
  };

  handleDeleteUser = async (user) => {
    console.log("Check delete detail", user);
    try {
      let response = await deleteUserService(user.id);
      if (response.data && response.data.errCode === 0) {
        alert(response.data.errMessage);
        await this.getAllUserFromReact();
      } else {
        alert(response.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  handleEditUser = (user) => {
    console.log("Check update user", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let response = await updateUserService(user);
      if (response.data && response.data.errCode === 0) {
        alert(response.data.errMessage);
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(response.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
    // console.log("Check update user: ", user);
  };

  render() {
    console.log("Check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModelUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />

        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Quản lý thông tin người dùng</div>
        <div className="d-flex justify-content-center mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.AddNewUser()}
          >
            <i className="fas fa-plus"></i>Thêm người dùng
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <thead>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Tác vụ</th>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  console.log("Cophee check map", item, index);
                  return (
                    <tr>
                      <td>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          className="btn-update"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
