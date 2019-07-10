import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";
import { Provider } from "react-redux";
import { StoreContext } from "redux-react-hook";
import configureStore from "./store";
import * as serviceWorker from "./serviceWorker";
const store = configureStore();
React.$store = store;
ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
