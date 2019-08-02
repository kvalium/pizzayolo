/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import store from "./store/store";

import TopBar from "./components/Struct/TopBar";
import Router from "./Router";

import ErrorBoundary from "./components/Struct/ErrorBoundary";

import "bulma/css/bulma.css";
import "./assets/styles.scss";

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Provider store={store}>
          <TopBar />
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </Provider>
      </HashRouter>
    );
  }
}
