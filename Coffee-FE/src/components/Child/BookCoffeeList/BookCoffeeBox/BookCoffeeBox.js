import React, { Component } from "react";
import "./BookCoffeeBox.css";
import BookCFImg from "../../../../assets/book-cf-1.jpg";

class BookCoffeeBox extends Component {
  render() {
    return (
      <div className="book-cf-image">
        <div className="book-avatar-image">
          <img src={BookCFImg}></img>
        </div>
        <div className="book-title-image">Đà Lạt Route</div>
      </div>
    );
  }
}

export default BookCoffeeBox;
