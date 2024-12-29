import React, { Component } from "react";
import "./StoreBox.css";
import StoreImg from "../../../assets/hinh1.png";

class StoreBox extends Component {
  render() {
    return (
      <div className="list-blog">
        <img src={StoreImg} />
        <div className="content-blog">
          <span>DAILY LOG COFFEE</span>
          <p>
            Daily Log Coffee là một điểm đến lý tưởng cho những người yêu thích
            sách và cà phê ở Dalat. Nằm giữa những con đường dễ thương của thành
            phố núi này, Cà phê nhật ký hàng ngày không chỉ là nơi để thưởng
            thức cà phê mỗi ngày mà còn Cũng là nơi dành cho những người đam mê
            cà phê và du khách.
            <br></br>
            Nhưng điều gì làm cho hàng ngày khác với hàng trăm quán cà phê khác
            phải Buổi biểu diễn của âm nhạc acoustic mỗi đêm. Ở đó, mọi người đã
            gặp các chàng trai và cô gái hát với tất cả niềm đam mê của người
            nghe Tinh thần theo từng câu và đắm mình trong mỗi cây đàn guitar và
            Cajon.
          </p>
        </div>
      </div>
    );
  }
}

export default StoreBox;
