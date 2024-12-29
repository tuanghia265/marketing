import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import IsLogin from "../../components/IsLogin/IsLogin";
import Footer from "../../components/Footer/footer";
import "./Profile.css";
import ProfileImg from "../../assets/profile.png";
import { getAllUsers } from "../../services/userService";
import { getAllStores } from "../../services/storeService";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      arrUsers: [],
      arrStores: [],
      userID: "",
    };
  }

  componentDidMount() {
    console.log("Đây là trang thông tin người dùng");
    this.getUserInfo();
    this.getAllStoresProfile();
    this.getUserID();
  }

  getUserID = async () => {
    let userResponse = await getAllUsers("ALL");
    let emails = userResponse.data.users.map((user) => user.email);
    let userLogin = JSON.parse(localStorage.getItem("User"));
    let foundUser = userResponse.data.users.find(
      (user) => user.email === userLogin.email
    );
    this.setState({
      userID: foundUser.id,
    });
    console.log("Check id user: ", this.state.userID);
  };

  getUserInfo = async () => {
    let response = await getAllUsers("ALL");
    let userLogin = JSON.parse(localStorage.getItem("User"));
    if (userLogin) {
      this.setState({
        userInfo: userLogin,
      });
      console.log("Thông tin đã lấy từ local storage: ", this.state.userInfo);
    }
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
  };

  getAllStoresProfile = async () => {
    let response = await getAllStores("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState({
        arrStores: response.data.store,
      });
    }
    console.log("Check state store: ", this.state.arrStores);
  };

  render() {
    let arrUsers = this.state.arrUsers;
    let arrStores = this.state.arrStores;
    let userInfo = this.state.userInfo;
    console.log("Check store LAN 2: ", arrStores);
    return (
      <div className="profile-page">
        <div className="top-nav">
          <IsLogin />
        </div>
        <div className="profile-container">
          <div className="profile-avt">
            <img src={ProfileImg}></img>
          </div>
          <div className="profile-body">
            <div className="profile-detail">
              <div className="profile-header">Hồ sơ người dùng</div>
              <div className="profile-ctn">
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    if (item.email === userInfo.email) {
                      return (
                        <div className="profile-text">
                          <div className="profile-name">
                            Họ và tên: {item.userName}
                          </div>
                          <div className="profile-email">
                            Email: {item.email}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>

              <div className="storeProfile-title">
                <p>Thông tin quán cafe của bạn</p>
              </div>
              <div className="storeProfile-body">
                {arrStores &&
                  arrStores.length > 0 &&
                  arrStores.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    if (item.userID === this.state.userID) {
                      return (
                        <div className="storeProfile-container">
                          <div className="storeProfile-name">
                            Tên quán: {item.name}
                          </div>
                          <div
                            className="storeProfile-img"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                          <div className="storeProfile-text">
                            Số điện thoại liên hệ: {item.telephone}
                          </div>
                          <div className="storeProfile-text">
                            Địa chỉ: {item.address}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Profile;
