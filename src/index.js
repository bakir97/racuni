import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
import reduxConfig from "./Redux/reduxConfig";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { loginUser } from "./Redux/actions/LoginAction";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
const store = reduxConfig();
const user = localStorage.getItem("user");
if (user) {
  store.dispatch(loginUser(JSON.parse(user)));
}
const Render = (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
ReactDOM.render(Render, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
