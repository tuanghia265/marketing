import React, { Component } from "react";
import "./AboutUs.css";
import AboutUsImg from "../../assets/about-us-image.png";
import TopNav from "../../components/TopNav/TopNav";
import Footer from "../../components/Footer/footer";

class AboutUs extends Component {
  render() {
    return (
      <div className="aboutus-container">
        <div className="top-nav">
          <TopNav />
        </div>
        <div className="aboutus-main">
          <div className="aboutus-title">Về chúng tôi</div>
          <div className="aboutus-row">
            <div class="about-item">
              <div className="aboutus about-img">
                <img src={AboutUsImg} alt="AboutUs"></img>
              </div>
              <div className="aboutus about-side-content">
                <p>
                  Chào mừng đến với góc yên tĩnh của chúng tôi giữa Misty Tây
                  Nguyên của Đà Lạt. Chúng tôi là những nhà cung cấp đam mê của
                  nghệ thuật Cà phê, nép mình trong trung tâm của thị trấn đẹp
                  như tranh vẽ này.
                </p>
                <h2>Câu chuyện</h2>
                <p>
                  Sinh ra từ một tình yêu cho cả phong cảnh thanh thản của Đà
                  Lạt và mang hương thơm của cà phê mới pha, hành trình của
                  chúng tôi bắt đầu với một mong muốn đơn giản - để tạo ra một
                  thiên đường nơi mọi người có thể Thư giãn và thưởng thức những
                  khoảnh khắc tốt hơn của cuộc sống. Với một sự pha trộn của sự
                  cống hiến và một sự sáng tạo, chúng tôi đã biến đổi điều này
                  Khát vọng vào thực tế.
                </p>
                <h2>Điều gì làm chúng ta khác biệt</h2>
                <p>
                  Trong một thành phố được biết đến với phong cảnh mê hoặc của
                  nó, chúng tôi cố gắng đứng không chỉ cho địa phương danh lam
                  thắng cảnh của chúng tôi, mà còn cho những người vô song Kinh
                  nghiệm chúng tôi cung cấp. Mỗi tách cà phê được chế tác với Độ
                  chính xác và chăm sóc, có nguồn gốc từ những hạt đậu tốt nhất
                  một cách tỉ mỉ được chọn để đảm bảo mọi SIP Tantalize các giác
                  quan.{" "}
                </p>
              </div>
            </div>
            <div class=".post-about-item">
              <div>
                <h2>Quan điểm của chúng tôi</h2>
                <p>
                  Cốt lõi của chúng tôi là một cam kết xuất sắc, không chỉ trong
                  Đồ uống chúng tôi phục vụ, nhưng trong bầu không khí chúng tôi
                  tu luyện. Của chúng tôi Không gian không chỉ là một quán cà
                  phê; Đó là một khu bảo tồn nơi Cuộc trò chuyện chảy tự do,
                  tình bạn nở rộ, và những khoảnh khắc được trân trọng. Chúng
                  tôi tin vào việc thúc đẩy các kết nối, cho dù Đó là giữa những
                  người bạn bắt kịp một cốc Joe hoặc Du khách trao đổi câu
                  chuyện từ cuộc phiêu lưu của họ.
                </p>
                <h2>Cộng đồng</h2>
                <p>
                  Chúng tôi là một phần của tấm thảm rực rỡ là Đà Lạt. Từ hỗ trợ
                  địa phương Các nghệ nhân để vô địch thực hành bền vững, chúng
                  tôi dành riêng để trả lại cho cộng đồng đã chào đón chúng tôi
                  với vòng tay rộng mở.
                </p>
                <h2>Lời cảm ơn</h2>
                <p>
                  Vì vậy, cho dù bạn là một người hâm mộ cà phê đang tìm kiếm
                  bản sửa lỗi caffeine tiếp theo của bạn hay một kẻ lang thang
                  để tìm kiếm một thời gian nghỉ ngơi từ những con đường nhộn
                  nhịp, hãy tham gia cùng chúng tôi để theo đuổi chiếc cốc hoàn
                  hảo. Cùng nhau, chúng ta hãy tạo ra những khoảnh khắc để nhớ
                  giữa sức hấp dẫn mù sương của Đà Lạt. Cảm ơn bạn đã là một
                  phần của câu chuyện của chúng tôi.
                </p>
                <p className="link-contact">
                  <p className="link link-1">[Contact Information],</p>
                  <p className="link link-2">[Social Media Links]</p>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default AboutUs;
