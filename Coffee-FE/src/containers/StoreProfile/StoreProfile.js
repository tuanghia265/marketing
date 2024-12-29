import Logo from "../../assets/cophee-icon.png";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/profile.png";
import "./StoreProfile.css";
import Footer from "../../components/Footer/footer";
import React, { Component } from "react";
import AvtProfile from "../../assets/about-us-image.png";
import { CommonUtils } from "../../utils";
import { createNewStoreService } from "../../services/storeService";
import { getAllUsers } from "../../services/userService";

class StoreProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      telephone: "",
      address: "",
      url: "",
      image: AvtProfile,
      userID: "",
    };
  }

  handleOnchangeStoreName = (event) => {
    this.setState({
      name: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnchangeURL = (event) => {
    this.setState({
      url: event.target.value,
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
    console.log("Image data: ", this.state.image);
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

  handleAddNewStore = async (data) => {
    let userResponse = await getAllUsers("ALL");
    let emails = userResponse.data.users.map((user) => user.email);
    let userLogin = JSON.parse(localStorage.getItem("User"));
    let foundUser = userResponse.data.users.find(
      (user) => user.email === userLogin.email
    );
    this.setState({
      userID: foundUser.id,
    });
    data = this.state;
    let isValid = this.checkValideInput();
    if (isValid === true) {
      try {
        let response = await createNewStoreService(data);
        if (response && response.data.errCode !== 0) {
          console.log("Response create store: ", response.data);
          alert(response.data.errMessage);
        } else {
          alert("Thêm thành công");
          window.location.href = "/user";
        }
      } catch (e) {
        console.log(e);
      }
      console.log("Check dữ liệu người dùng: ", data);
    }
  };

  render() {
    console.log("Check state storeprofile: ", this.state);
    return (
      <div className="storepr-container">
        <div className="top-nav">
          <div className="top-nav-box">
            <div className="top-nav-bar">
              <div class="logo">
                <img src={Logo} href="/home/user" alt="Logo" />
              </div>
              <div className="main-nav">
                <li>
                  <a class="home-btn" href="/home/user">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/location/user">Quán cà phê</a>
                </li>
                {/* <li>
              <a href="/aboutus/user">Về chúng tôi</a>
            </li> */}
              </div>
              <div className="profile-nav">
                <div className="profile-img">
                  <img src={ProfileImg} alt="Profile"></img>
                  <Link to={"/home/user"}></Link>
                </div>
                <div class="profile-list">
                  <a href="/user">Hồ sơ của bạn</a>
                  <a href="/home">Đăng xuất</a>
                </div>
              </div>
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm quán cà phê? Nhấn vào nút bên cạnh nhé."
                id="search-bar"
                disabled
              />
              <Link to={"/location/user"}>
                <button
                  type="button"
                  id="search-btn"
                  style={{ fontWeight: 600 }}
                >
                  <i class="fas fa-search"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="storeInfo-body">
          <div className="storepf-title">Đăng ký thông tin quán cà phê</div>
          <div className="storeInfo-text">
            <div className="storeInfo-avt">
              <div className="input-container">
                <div
                  className="storeAvt"
                  style={{ backgroundImage: `url(${this.state.image})` }}
                ></div>
                <input
                  id="image-upload"
                  type="file"
                  onChange={this.handleOnchangeImage}
                />
              </div>
            </div>
            <div className="storeInfo-input">
              <div className="input-container">
                <label>Tên quán</label>
                <input
                  type="text"
                  placeholder="Cafe Con Chồn,...v.v"
                  onChange={(event) => {
                    this.handleOnchangeStoreName(event);
                  }}
                  value={this.state.name}
                />
              </div>
              <div className="input-container">
                <label>Số điện thoại liên hệ</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeTelephone(event);
                  }}
                  value={this.state.telephone}
                />
              </div>
              <div className="input-container">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnchangeAddress(event);
                  }}
                  value={this.state.address}
                />
              </div>
              <div className="input-container">
                <label>Đường link truyền thông</label>
                <input
                  type="text"
                  placeholder="Tiktok, Facebook,...v.v"
                  onChange={(event) => {
                    this.handleOnchangeURL(event);
                  }}
                  value={this.state.url}
                />
              </div>
              <div className="storePf-btn">
                <button
                  type="submit"
                  onClick={() => {
                    this.handleAddNewStore();
                  }}
                >
                  Đăng ký
                </button>
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

export default StoreProfile;
