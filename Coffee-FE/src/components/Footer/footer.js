import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../assets/cophee-icon.png";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="logo">
          <img src={Logo} href="" />
        </div>
        <div className="text">
          <div className="phone">Phone: +84 99888777</div>
          <div className="email">Email: daiilord@gmail.com</div>
        </div>
        <div className="line"></div>
        <div className="reversed">@2024 All Rights Reversed.</div>
      </div>
    );
  }
}

export default Footer;
