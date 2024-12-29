import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Resigter.css";
import { FormattedMessage } from "react-intl";
import { handleResigter, handleLogin } from "../../services/userService";
import axios from "axios";
import { size } from "lodash";
import Logo from "../../assets/cophee-icon.png";
import { withRouter } from "react-router-dom";

class Resigter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isShowPwd: false,
      username: "",
      roleID: "",
    };
  }

  handleOnChangeUsername = (even) => {
    this.setState({
      username: even.target.value,
    });
    console.log(even.target.value);
  };

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    console.log(event.target.value);
  };

  handleResigter = async () => {
    this.setState({
      errMessage: "",
    });

    console.log("Username: ", this.state.username);
    console.log("Email: ", this.state.email);
    console.log("Password: ", this.state.password);
    console.log("RoleID: ", this.state.roleID);
    try {
      //Gọi hàm handleResigter từ file userService.js
      let response = await handleResigter(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.roleID
      );
      //Nếu errCode phía server trả về khác 0 thì hiển thị mã lỗi lên màn hình
      if (response.data.errCode !== 0) {
        this.setState({
          errMessage: response.data.errMessage,
        });
      }
      //Nếu errCode phía server trả về bằng 0 thì đăng nhập thành công
      if (response.data.errCode === 0) {
        // this.props.userLoginSuccess(response.user);
        this.props.history.push("/home/user");
        try {
          //Gọi hàm handleLogin từ file userService.js
          let response = await handleLogin(
            this.state.email,
            this.state.password
          );
          //Nếu errCode phía server trả về khác 0 thì hiển thị mã lỗi lên màn hình
          if (response.data.errCode !== 0) {
            this.setState({
              errMessage: response.data.message,
            });
          }
          //Nếu errCode phía server trả về bằng 0 thì đăng nhập thành công
          if (response.data.errCode === 0) {
            // this.props.userLoginSuccess(response.user);
            this.props.history.push("/home/user");
            localStorage.setItem("User", JSON.stringify(response.data.user));
          }
          //Hiển thị lỗi nếu ô nhập email và mật khẩu trống
        } catch (e) {
          if (e.response) {
            if (e.response.data) {
              this.setState({
                errMessage: e.response.data.message,
              });
              console.log(e.response.data.message);
            }
          }
        }
      }
      //Hiển thị lỗi nếu ô nhập email và mật khẩu trống
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
          console.log(e.response.data.message);
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPwd: !this.state.isShowPwd,
    });
  };

  Comeback() {
    window.location.href = "/home";
  }

  render() {
    return (
      <div className="resigter-background">
        <div className="btn btn-logout" onClick={this.Comeback}>
          <i className="fas fa-sign-out-alt"></i>
        </div>
        <div className="resigter-container">
          <div className="resigter-content row">
            <div className="col-12 text-resigter">
              <img src={Logo} style={{ width: 64, height: 64 }}></img>
            </div>
            <div className="col-12 text-resigter">Đăng ký</div>
            <div className="col-12 form-group resigter-input">
              <label>Tên người dùng</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tên người dùng"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group resigter-input">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-12 form-group resigter-input">
              <label>Mật khẩu</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPwd ? "text" : "password"}
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    class={
                      this.state.isShowPwd ? "far fa-eye" : "fas fa-eye-slash"
                    }
                  />
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red", fontSize: 14 }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-resigter"
                onClick={() => this.handleResigter()}
              >
                Đăng ký
              </button>
            </div>

            {/* <div className="col-12">
              <span className="forgot-password">Qu?</span>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Resigter);
