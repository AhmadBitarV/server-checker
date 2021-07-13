import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import reportWebVitals from "./reportWebVitals";

import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import authReducer from "./store/reducers/auth";
import serversReducer from "./store/reducers/servers";

import "./index.css";
import "./App.scss";

import App from "./App";

const composeEnhancers = compose;

const rootReducer = combineReducers({
  auth: authReducer,
  servers: serversReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
reportWebVitals();
