import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ProductManage.scss";
import {
  getAllStores,
  createNewStoreService,
  updateStoreService,
  deleteStoreService,
} from "../../services/storeService";
import ModalProduct from "./ModalProduct";
import { emitter } from "../../utils/emitter";
import ModalEditStore from "./ModalEditStore";

class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStores: [],
      isOpenModalStore: false,
      isOpenModalEditStore: false,
      storeEdit: {},
    };
  }

  AddNewStore = () => {
    this.setState({
      isOpenModalStore: true,
    });
  };

  async componentDidMount() {
    await this.getAllStoresFromReact();
  }

  toggleStoreModal = () => {
    this.setState({
      isOpenModalStore: !this.state.isOpenModalStore,
    });
  };

  createNewStore = async (data) => {
    try {
      let response = await createNewStoreService(data);
      if (response && response.data.errCode !== 0) {
        console.log("Response create store: ", response.data);
        alert(response.data.errMessage);
      } else {
        await this.getAllStoresFromReact();
        alert("Thêm thành công");
        this.setState({
          isOpenModalStore: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("Check data from React: ", data);
  };

  getAllStoresFromReact = async () => {
    let response = await getAllStores("ALL");
    if (response.data && response.data.errCode === 0) {
      this.setState(
        {
          arrStores: response.data.store,
        },
        () => {
          console.log("Check state stores", this.state.arrStores);
        }
      );
    }
  };

  doEditStore = async (store) => {
    try {
      let response = await updateStoreService(store);
      if (response.data && response.data.errCode === 0) {
        alert(response.data.errMessage);
        this.setState({
          isOpenModalEditStore: false,
        });
        await this.getAllStoresFromReact();
      } else {
        alert(response.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  toggleEditStoreModal = () => {
    this.setState({
      isOpenModalEditStore: !this.state.isOpenModalEditStore,
    });
  };

  handleEditStore = (store) => {
    console.log("Check update store", store);
    this.setState({
      isOpenModalEditStore: true,
      storeEdit: store,
    });
  };

  handleDeleteStore = async (store) => {
    console.log("Check delete detail", store);
    try {
      let response = await deleteStoreService(store.id);
      if (response.data && response.data.errCode === 0) {
        alert(response.data.errMessage);
        await this.getAllStoresFromReact();
      } else {
        alert(response.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log("Check stores: ", this.state);
    let arrStores = this.state.arrStores;
    return (
      <div className="store-container">
        <ModalProduct
          isStoreOpen={this.state.isOpenModalStore}
          toggleFromStore={this.toggleStoreModal}
          createNewStore={this.createNewStore}
          currentStore={this.state.storeEdit}
        />

        {this.state.isOpenModalEditStore && (
          <ModalEditStore
            isStoreOpen={this.state.isOpenModalEditStore}
            toggleFromStore={this.toggleEditStoreModal}
            currentStore={this.state.storeEdit}
            editStore={this.doEditStore}
          />
        )}

        <div className="title text-center">Quản lý quán cà phê</div>
        <div className="d-flex justify-content-center mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.AddNewStore()}
          >
            <i className="fas fa-plus"></i>Thêm quán cà phê mới
          </button>
        </div>
        <div className="stores-table mt-3 mx-1">
          <table id="stores">
            <thead>
              <th>Tên quán</th>
              <th>URL</th>
              <th>ID Chủ quán</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Tác vụ</th>
            </thead>
            <tbody>
              {arrStores &&
                arrStores.map((item, index) => {
                  console.log("Cophee check map", item, index);
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.url}</td>
                      <td>{item.userID}</td>
                      <td>{item.telephone}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-update"
                          onClick={() => this.handleEditStore(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteStore(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.AddNewStore()}
          >
            <i className="fas fa-plus"></i>Thêm quán cà phê mới
          </button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
