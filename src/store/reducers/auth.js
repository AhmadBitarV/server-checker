import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return {
    ...initialState,
    error: null,
    loading: true,
  };
};

const authSucess = (state, action) => {
  return {
    ...initialState,
    token: action.token,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return {
    ...initialState,
    error: action.error,
    loading: false,
  };
};

const logOut = (state, action) => {
  return {
    ...initialState,
    token: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSucess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logOut(state, action);
    default:
      return state;
  }
};

export default reducer;
