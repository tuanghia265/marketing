import React from "react";
import Video from "../../assets/HomeVideo.mp4";
import "./video_bg.css";

export default function video_bg() {
  return (
    <video
      className="home-video"
      muted
      autoPlay
      loop
      src={Video}
      type="video/mp4"
    ></video>
  );
}
