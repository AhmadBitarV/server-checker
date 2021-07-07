import axios from "axios";

import * as actionTypes from "./actionTypes";

export const fetchServersStart = () => {
  return {
    type: actionTypes.FETCH_SERVERS_START,
  };
};

export const fetchServersFail = (error) => {
  return {
    type: actionTypes.FETCH_SERVERS_FAIL,
    error: error,
  };
};

export const fetchServersSuccess = (servers) => {
  return {
    type: actionTypes.FETCH_SERVERS_SUCCESS,
    servers: servers,
  };
};

export const sortServersByName = () => {
  return {
    type: actionTypes.SORT_SERVERS_BY_NAME,
  };
};

export const sortServersByDistance = () => {
  return {
    type: actionTypes.SORT_SERVERS_BY_DISTANCE,
  };
};

export const fetchServers = (token) => {
  return (dispatch) => {
    dispatch(fetchServersStart());
    axios
      .get("https://playground.tesonet.lt/v1/servers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const servers = [];
        for (let key in res.data) {
          servers.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchServersSuccess(servers));
      })
      .catch((error) => {
        dispatch(fetchServersFail(error));
      });
  };
};
