import React, { Component } from "react";
import "./ShortIntro.css";
import ShortIntroduceImg from "../../../assets/home-introduce.jpg";

class ShortIntro extends Component {
  render() {
    return (
      <div className="short-introduce">
        <div className="image-introduce">
          <img src={ShortIntroduceImg}></img>
        </div>
        <div className="content-introduce">
          <div className="title-introduce">DALAT'S COFFEE</div>
          <p>
            Đà Lạt, thành phố ngàn hoa và sương mù, không chỉ nổi tiếng với cảnh
            quan thiên nhiên tuyệt đẹp mà còn là thiên đường của những quán cà
            phê độc đáo. Hệ thống quán cà phê tại Đà Lạt là sự kết hợp hoàn hảo
            giữa không gian nghệ thuật, hương vị đậm đà của cà phê cao nguyên và
            phong cách phục vụ thân thiện. Đây là nơi lý tưởng để thư giãn, tìm
            kiếm cảm hứng và tận hưởng khoảnh khắc yên bình.
          </p>
          <p>
            Văn hóa cà phê của Đà Lạt là sự pha trộn hài hòa của truyền thống và
            đổi mới. Với đất đai màu mỡ và khí hậu thuận lợi, khu vực này sản
            xuất một số hạt cà phê arabica tốt nhất ở Việt Nam. Hành trình cà
            phê ở Đà Lạt bắt đầu với sự trồng trọt tỉ mỉ của các loại cây cà phê
            trên các sườn đồi bậc thang, nơi nông dân cẩn thận nuôi dưỡng cây
            trồng của họ với sự cống hiến và chuyên môn. Điều thực sự làm cho
            cảnh cà phê của Đà Lạt khác biệt là các quán cà phê quyến rũ và các
            cửa hàng cà phê kỳ quặc nằm rải rác khắp thành phố. Tại đây, giữa
            môi trường xung quanh và kiến trúc mộc mạc, người ta có thể thưởng
            thức một tách cà phê mới pha trong khi đắm mình trong bầu không khí
            thoải mái và vẻ đẹp yên tĩnh của Đà Lạt.
          </p>
        </div>
      </div>
    );
  }
}

export default ShortIntro;
