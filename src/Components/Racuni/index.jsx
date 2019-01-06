import React, { Component } from "react";
import { connect } from "react-redux";

export class Racuni extends Component {
  componentDidMount() {
    if (!this.props.user.isAuth) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div>
        <p>alooooo racuni</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Racuni);
