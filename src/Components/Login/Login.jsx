import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Button } from "@material-ui/core";
export default class index extends Component {
  componentDidMount() {
    console.log(this.props);

    if (this.props.user.isAuth) {
      this.props.history.push("racuni");
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user.isAuth && this.props.user.isAuth) {
      this.props.history.replace("racuni");
    }
  }

  state = { username: "", password: "" };
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
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
              type="username"
              name="username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              autoComplete="password"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleChangeInput(e)}
              value={this.state.password}
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
