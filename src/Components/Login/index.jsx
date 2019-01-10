import React, { Component } from "react";
import { connect } from "react-redux";
import { login, errorLogin } from "../../Redux/actions/LoginAction";
import Login from "./Login";
export class index extends Component {
  render() {
    return <Login {...this.props} />;
  }
}

const mapStateToProps = state => ({
  user: state.all.user,
  errorLoginState: state.all.errorLogin
});

const mapDispatchToProps = {
  login,
  errorLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
