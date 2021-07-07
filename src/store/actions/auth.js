import axios from "axios";
import * as actions from "./index";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username: username,
      password: password,
    };

    axios
      .post("https://playground.tesonet.lt/v1/tokens", authData)
      .then((res) => {
        dispatch(authSuccess(res.data.token));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
