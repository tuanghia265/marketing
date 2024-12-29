import React, { Component } from "react";
import "./RecommandBox.css";
import RecommandImage from "../../../../assets/recommend-list-1.jpg";

class RecommandBox extends Component {
  render() {
    return (
      <div className="recommand-image">
        <div className="avatar-image">
          <img src={RecommandImage} alt="Recommand"></img>
        </div>
        <div className="title-image">Phoenix Garden</div>
      </div>
    );
  }
}

export default RecommandBox;
