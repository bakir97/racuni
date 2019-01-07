import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
class index extends Component {
  state = {
    ...this.props.jedanUnos,
    datumPocetkaSedmice: moment(
      this.props.jedanUnos.datumPocetkaSedmice
    ).format("YYYY-MM-DD"),
    datumZavrsetkaSedmice: moment(
      this.props.jedanUnos.datumZavrsetkaSedmice
    ).format("YYYY-MM-DD")
  };
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    console.log(this.state);

    return (
      <form onSubmit={this.submit}>
        <Grid
          direction="column"
          container
          justify="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid>
            <TextField
              label="Username"
              type="date"
              name="datumPocetkaSedmice"
              margin="normal"
              variant="outlined"
              value={this.state.datumPocetkaSedmice}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Username"
              type="date"
              name="datumZavrsetkaSedmice"
              margin="normal"
              variant="outlined"
              value={this.state.datumZavrsetkaSedmice}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Username"
              type="username"
              name="username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Potrosnja"
              type="number"
              name="potrosnja"
              autoComplete="password"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleChangeInput(e)}
              value={this.state.potrosnja}
            />
          </Grid>
          <Grid>
            <Button variant="outlined" color="primary" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  jedanUnos: state.all.jedanUnos
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
