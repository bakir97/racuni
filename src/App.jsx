import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Components/Login";
import { withRouter, Route, Switch } from "react-router-dom";
import Racuni from "./Components/Racuni";
import EditUnose from "./Components/Racuni/EditUnose";
import CreateUnose from "./Components/Racuni/createUnose";
class App extends Component {
  render() {
    const auth = this.props.all.user.isAuth ? (
      <Switch>
        <Route path="/createUnos" component={CreateUnose} />
        <Route path="/editUnos" component={EditUnose} />
        <Route path="/racuni" component={Racuni} />
        <Route exact path="/" render={props => <Login {...props} />} />
      </Switch>
    ) : (
      <Switch>
        <Route path="/editUnos" component={EditUnose} />
        <Route path="/createUnos" component={CreateUnose} />
        <Route exact path="/" render={props => <Login {...props} />} />
      </Switch>
    );
    return auth;
  }
}
const mapStateToProps = state => ({
  all: state.all
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
