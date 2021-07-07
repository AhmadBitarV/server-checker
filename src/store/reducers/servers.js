import * as actionTypes from "../actions/actionTypes";

const initialState = {
  servers: [],
  loading: false,
};

const fetchServersStart = (state, action) => {
  return {
    ...initialState,
    loading: true,
  };
};

const fetchServersSuccess = (state, action) => {
  return {
    ...initialState,
    servers: action.servers,
    loading: false,
  };
};

const fetchServersFail = (state, action) => {
  return {
    ...initialState,
    loading: false,
  };
};

const sortServersByName = (state, action) => {
  const newState = Object.assign({}, state);
  let updatedArray = state.servers;
  updatedArray.sort((firstKey, secondKey) => {
    if (firstKey.name.toLowerCase() < secondKey.name.toLowerCase()) return -1;
    if (firstKey.name.toLowerCase() > secondKey.name.toLowerCase()) return 1;
    return 0;
  });

  newState.servers = updatedArray.slice(0);

  return newState;
};

const sortServersByDistance = (state, action) => {
  const newState = Object.assign({}, state);
  let updatedArray = state.servers;
  updatedArray.sort((firstKey, secondKey) => {
    return firstKey.distance - secondKey.distance;
  });

  newState.servers = updatedArray.slice(0);
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SERVERS_START:
      return fetchServersStart(state, action);
    case actionTypes.FETCH_SERVERS_SUCCESS:
      return fetchServersSuccess(state, action);
    case actionTypes.FETCH_SERVERS_FAIL:
      return fetchServersFail(state, action);
    case actionTypes.SORT_SERVERS_BY_NAME:
      return sortServersByName(state, action);
    case actionTypes.SORT_SERVERS_BY_DISTANCE:
      return sortServersByDistance(state, action);

    default:
      return state;
  }
};

export default reducer;
