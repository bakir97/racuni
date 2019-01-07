import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/actions/LoginAction";
import Login from "./Login";
export class index extends Component {
  render() {
    return <Login {...this.props} />;
  }
}

const mapStateToProps = state => ({
  user: state.all.user
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
