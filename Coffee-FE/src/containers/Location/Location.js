import React, { Component } from "react";
import TopNav from "../../components/TopNav/TopNav";
import Footer from "../../components/Footer/footer";
import "./Location.css";
import StoreBox from "../../components/Child/StoreBox/StoreBox";
import { getAllStores } from "../../services/storeService";
import { getAllUsers } from "../../services/userService";
import Logo from "../../assets/cophee-icon.png";
import { Link } from "react-router-dom";
import ModalStoreView from "../../components/Child/ModalStoreView/ModalStoreView";
import ModalProduct from "../System/ModalProduct";

class LocationLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStores: [],
      arrUsers: [],
      storeSearch: "",
      storeResult: [],
      storeResultKey: "",
      isOpenModalView: false,
      storeInfo: {},
    };
  }

  async componentDidMount() {
    await this.getAllStoresLocation();
    await this.getAllUserLocation();
  }

  getStoreByKey = async () => {
    let response = await getAllStores("ALL");
    let storeSearch = this.state.storeSearch;
    if (response.data && response.data.errCode === 0) {
      if (storeSearch == "") {
        this.setState({
          arrStores: response.data.store,
          storeResultKey: "",
        });
      } else {
        let filterStores = [];
        response.data.store.map((store) => {
          let filteredStores = response.data.store.filter((store) =>
            store.name.toLowerCase().includes(storeSearch.toLowerCase())
          );

          if (filteredStores.length === 0) {
            this.setState({
              storeResultKey: `Không có kết quả cho "${storeSearch}"`,
              arrStores: [],
              storeSearch: "",
            });
          } else {
            this.setState({
              arrStores: filteredStores,
              storeSearch: "",
              storeResultKey: null,
            });
          }
        });
      }
    }
  };

  handleOnchangeSearch = (event) => {
    this.setState({
      storeSearch: event.target.value,
    });
    console.log(event.target.value);
  };

  //Hiện tất cả quán cafe
  getAllStoresLocation = async () => {
    let response = await getAllStores("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState({
        arrStores: response.data.store,
      });
    }
  };

  getAllUserLocation = async () => {
    let response = await getAllUsers("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState({
        arrUsers: response.data.users,
      });
    }
  };

  getTopicStoreLocation = async (store) => {
    await this.setState({
      storeInfo: store,
      isOpenModalView: true,
    });
    console.log("Đã chọn: ", this.state.storeInfo);
  };

  viewTopicStore = (store) => {
    this.setState({
      isOpenModalView: false,
    });
  };

  toggleStoreModal = () => {
    this.setState({
      isOpenModalView: !this.state.isOpenModalView,
    });
  };

  render() {
    let arrStores = this.state.arrStores;
    let arrUsers = this.state.arrUsers;
    let storeSearch = this.state.storeSearch;
    let storeInfo = this.state.storeInfo;
    return (
      <div className="all-list-container">
        <ModalStoreView
          isModalOpen={this.state.isOpenModalView}
          currentStore={storeInfo}
          toggleFromStore={this.toggleStoreModal}
        />
        <div className="top-nav">
          <div className="top-nav-bar">
            <div class="logo">
              <img src={Logo} href="/home" alt="Logo" />
            </div>
            <div className="main-nav">
              <li>
                <a class="home-btn" href="/home">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/listall">Quán cà phê</a>
              </li>
              {/* <li>
              <a href="/aboutus">Về chúng tôi</a>
            </li> */}
            </div>
            <div className="login-nav">
              <Link to={"/userlogin"}>
                <button type="submit" className="login-btn" id="login-btn">
                  Đăng nhập
                </button>
              </Link>
              <div className="half"></div>
              <Link to={"/resigter"}>
                <button className="resigter-btn" id="resigter-btn">
                  Đăng ký
                </button>
              </Link>
            </div>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm quán cà phê tại đây..."
              id="search-bar"
              onChange={(event) => {
                this.handleOnchangeSearch(event);
              }}
              value={this.state.storeSearch}
            />
            <button
              type="submit"
              id="search-btn"
              style={{ fontWeight: 600 }}
              onClick={this.getStoreByKey}
            >
              <i class="fas fa-search"></i>
            </button>
          </div>

          <div className="storeDK-container">
            <Link to={"/userlogin"}>
              <button
                type="button"
                className="storeDK-btn"
                style={{ fontWeight: 600 }}
              >
                Giới thiệu quán cafe của bạn?
              </button>
            </Link>
          </div>
        </div>

        <div className="search-result">{this.state.storeResultKey}</div>
        <div className="all-list">
          {arrStores &&
            arrStores.length > 0 &&
            arrStores.map((item, index) => {
              if (storeSearch == "") {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div>
                    <div
                      className="store-body"
                      onClick={() => this.getTopicStoreLocation(item)}
                    >
                      <div
                        className="store-img"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <div className="store-content">
                        <div className="store-name">{item.name}</div>
                        {arrUsers &&
                          arrUsers.length > 0 &&
                          arrUsers.map((userItem, index) => {
                            if (item.userID === userItem.id) {
                              return (
                                <div className="store-info">
                                  <div className="store-username">
                                    Chủ quán: {userItem.userName}
                                  </div>
                                  <div className="store-adress">
                                    Địa chỉ: {item.address}
                                  </div>
                                  <div className="store-telephone">
                                    Liên hệ: {item.telephone}
                                  </div>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                );
              } else {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div>
                    <div
                      className="store-body"
                      onClick={() => this.getTopicStoreLocation(item)}
                    >
                      <div
                        className="store-img"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <div className="store-content">
                        <div className="store-name">{item.name}</div>
                        {arrUsers &&
                          arrUsers.length > 0 &&
                          arrUsers.map((userItem, index) => {
                            if (item.userID === userItem.id) {
                              return (
                                <div className="store-info">
                                  <div className="store-username">
                                    Chủ quán: {userItem.userName}
                                  </div>
                                  <div className="store-adress">
                                    Địa chỉ: {item.address}
                                  </div>
                                  <div className="store-telephone">
                                    Liên hệ: {item.telephone}
                                  </div>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default LocationLogin;
