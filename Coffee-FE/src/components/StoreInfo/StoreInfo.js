import React, { Component } from "react";
import "./StoreInfo.css";
import TopNav from "../TopNav/TopNav";
import Footer from "../Footer/footer";

class StoreInfo extends Component {
  render() {
    return (
      <div className="store-info-container">
        <div className="top-nav">
          <TopNav />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default StoreInfo;
