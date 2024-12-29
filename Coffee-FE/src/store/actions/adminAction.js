import actionTypes from "./actionTypes";
import { getAllStores } from "../../services/storeService";

export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const storeList = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllStores("ALL");
      if (res.data && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.STORE_LIST,
          data: res.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
