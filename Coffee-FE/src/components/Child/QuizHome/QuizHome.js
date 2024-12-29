import React, { Component } from "react";
import "./QuizHome.css";
import Happy from "../../../assets/happy-icon.png";
import Location from "../../../assets/location-icon.png";
import Rate from "../../../assets/rate-icon.png";
import Peace from "../../../assets/inner-peace-icon.png";

class QuizHome extends Component {
  render() {
    return (
      <div className="quiz-container">
        <div className="quiz-title">BẢNG GỢI Ý NHỎ?</div>

        <div className="box-quiz">
          <div className="box quiz-1">
            <img src={Location}></img>
            <div className="quiz-content">
              <div className="box-quiz-title">
                Gần trung tâm thành phố Đà Lạt
              </div>
              <p>Xung quanh Hồ Xuân Hương</p>
            </div>
          </div>

          <div className="box quiz-2">
            <img src={Rate}></img>
            <div className="quiz-content">
              <div className="box-quiz-title">View chất</div>
              <p>
                Tất nhiên rồi. Đi cà phê thì phải selfie ở nơi có view chất
                chứ!!!
              </p>
            </div>
          </div>

          <div className="box quiz-3">
            <img src={Happy}></img>
            <div className="quiz-content">
              <div className="box-quiz-title">Đánh giá tốt</div>
              <p>Chất lượng phục vụ và đồ uống được đánh giá cao</p>
            </div>
          </div>

          <div className="box quiz-4">
            <img src={Peace}></img>
            <div className="quiz-content">
              <div className="box-quiz-title">Yên tĩnh</div>
              <p>Để chữa lành, để tĩnh tâm, để thư giãn,...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizHome;
