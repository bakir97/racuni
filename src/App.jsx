import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Components/Login";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Racuni from "./Components/Racuni";
class App extends Component {
  render() {
    const auth = this.props.user.isAuth ? (
      <>
        <Route path="/racuni" component={Racuni} />
        <Route path="/" render={() => <Redirect to="/racuni" />} />
      </>
    ) : (
      <Route path="/" render={props => <Login {...props} />} />
    );
    return <Switch>{auth}</Switch>;
  }
}
const mapStateToProps = state => ({
  user: state.login
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
