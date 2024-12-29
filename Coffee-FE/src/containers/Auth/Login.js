import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleAdminLogin } from "../../services/userService";
import axios from "axios";
import { size } from "lodash";
import Logo from "../../assets/cophee-icon.png";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isShowPwd: false,
    };
  }

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

  comeback = () => {
    console.log("Log out");
    this.props.processLogout();
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    console.log("Email: ", this.state.email);
    console.log("Password: ", this.state.password);
    try {
      //Gọi hàm handleLogin từ file userService.js
      let response = await handleAdminLogin(
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
        console.log("Thông tin đã đăng nhập: ", response.data.user);
        this.props.userLoginSuccess(response.user);
        localStorage.setItem("User", JSON.stringify(response.data.user));
        // this.props.history.push("/home/user");
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

  render() {
    return (
      <div className="login-background">
        {/* <div className="btn btn-logout" onClick={() => this.comeback()}>
          <i className="fas fa-sign-out-alt"></i>
        </div> */}
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">
              <img src={Logo} style={{ width: 64, height: 64 }}></img>
            </div>
            <div className="col-12 text-login">Đăng nhập quản trị viên</div>
            <div className="col-12 form-group login-input">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
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
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Đăng nhập
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
    userInfo: state.user.userInfo,
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
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
