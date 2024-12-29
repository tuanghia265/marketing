import React, { Component } from "react";
import "./TopNav.css";
import Logo from "../../assets/cophee-icon.png";
import { Link } from "react-router-dom";
import LocationLogin from "../../containers/Location/Location";
import { getAllStores } from "../../services/storeService";
import { getAllUsers } from "../../services/userService";

class TopNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-nav-box">
        <div className="top-nav-bar">
          <div class="logo">
            <img src={Logo} href="/home" alt="Logo" />
          </div>
          <div className="main-nav">
            <li>
              <a class="home-btn" href="/home">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="/listall">Quán cà phê</a>
            </li>
            {/* <li>
              <a href="/aboutus">Về chúng tôi</a>
            </li> */}
          </div>
          <div className="login-nav">
            <Link to={"/userlogin"}>
              <button type="submit" className="login-btn" id="login-btn">
                Đăng nhập
              </button>
            </Link>
            <div className="half"></div>
            <Link to={"/resigter"}>
              <button className="resigter-btn" id="resigter-btn">
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm quán cà phê? Nhấn vào nút bên cạnh nhé."
            id="search-bar"
            disabled
          />
          <Link to={"/listall"}>
            <button type="button" id="search-btn" style={{ fontWeight: 600 }}>
              <i class="fas fa-search"></i>
            </button>
          </Link>
        </div>
        <div className="storeDK-container">
          <Link to={"/userlogin"}>
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

export default TopNav;
