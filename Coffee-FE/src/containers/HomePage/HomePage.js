import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TopNav from "../../components/TopNav/TopNav";
import Footer from "../../components/Footer/footer";
import "./HomPage.css";
// import Video from "../../components/Video_BG/video_bg";
import ShortIntro from "../../components/Child/ShortIntroduce/ShortIntro";
import QuizHome from "../../components/Child/QuizHome/QuizHome";
import RecommandList from "../../components/Child/RecommandList/RecommandList";
import NewsList from "../../components/Child/NewsList/NewsList";
import BookCoffeeList from "../../components/Child/BookCoffeeList/BookCoffeeList";
import BackgroundHome from "../../assets/background-home.jpeg";

class HomePage extends Component {
  render() {
    return (
      <div className="homepg-container">
        <div className="top-nav">
          <TopNav />
        </div>
        <div className="background-home">
          <img src={BackgroundHome}></img>
        </div>

        <div className="intro-home">
          <ShortIntro />
        </div>

        <div className="recommand-sect">
          <div className="quiz-home">
            <QuizHome />
          </div>

          <div className="recommand-home">
            <RecommandList />
          </div>
        </div>

        <div className="book-cf-home">
          <div className="homePg-title">CÀ PHÊ SÁCH ĐÀ LẠT</div>
          <BookCoffeeList />
        </div>

        <div className="news-home">
          <div className="homePg-title">TIN TỨC</div>
          <NewsList />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
