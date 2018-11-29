import React, { Component } from "react";
import { connect } from "react-redux";
class App extends Component {
  render() {
    return <div>{this.props.test}</div>;
  }
}
const mapStateToProps = state => ({
  test: state.test.test
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
