import React, { Component } from "react";
import "./IsLogin.css";
import Logo from "../../assets/cophee-icon.png";
import { Link } from "react-router-dom";
import ProfileImg from "../../assets/profile.png";
import Navigator from "../../components/Navigator";

// import { adminMenu } from "../../containers/Header/menuApp";

class IsLogin extends Component {
  render() {
    return (
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
            <button type="button" id="search-btn" style={{ fontWeight: 600 }}>
              <i class="fas fa-search"></i>
            </button>
          </Link>
        </div>

        <div className="storeDK-container">
          <Link to={"/userstore"}>
            <button
              type="button"
              className="storeDK-btn"
              style={{ fontWeight: 600 }}
            >
              Giới thiệu quán cafe của bạn?
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default IsLogin;
