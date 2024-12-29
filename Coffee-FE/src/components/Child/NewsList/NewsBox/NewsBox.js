import React, { Component } from "react";
import "./NewsBox.css";
import NewsImage from "../../../../assets/news-list-1.jpg";

class NewsBox extends Component {
  render() {
    return (
      <div className="news-image">
        <div className="news-avt-image">
          <img src={NewsImage} />
        </div>

        <div className="news-content-background">
          <div className="news-text">
            <div className="news-title">
              MỌT COFFEE RA MẮT TRÀ SỮA THÁI MACCHIATO
            </div>

            <div className="news-content">
              <p className="nws-content">
                Phía sau Mọt, thật ra là một cô gái rất lười và lowtech. Lười là
                vì dù mở quán nước nhưng thực ra cô í không quan tâm gì đến nước
                cả. Bao năm nay cổ chỉ làm mọi thứ theo công thức có sẵn và nước
                vừa đủ ổn định là thôi. Sau 5 năm đi bán nước cô í vẫn đi quán
                khác để uống nước vì cổ thích uống món gì béo béo, kem kem nhưng
                cổ quá lười để tự mò mẫm mà làm. Rồi tự nhiên một ngày đẹp trời
                cô í đã bắt đầu muốn quan tâm đến thứ mình làm và cái món nước
                rất là không có gì mới mẻ đối với người khác lại làm cổ rất vui
                vì đã tự mò ra công thức riêng cho ẻm. Mà cái vui không phải là
                làm ra 1 món nước mà vui vì mình đã quan tâm đến thứ mình làm
                hơn 5 năm nay. Và tại sao cô í lại lowtech? Vì thời buổi này mấy
                cái design đơn giản ai cũng phải biết và cũng nên đi học 1 khoá
                nữa. Vậy mà cổ cũng chỉ mò mẫm rồi tự làm trông thật là xấu òm
                và nhà quê. Nhưng cô í cũng vẫn vui. Vì mọi thứ đều vừa sức của
                mình, tự mình làm ra, dù nhỏ thế nào, cũng đều vô cùng ý nghĩa
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsBox;
