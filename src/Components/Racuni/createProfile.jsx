import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  saveAccount,
  jedanUnos,
  getAllCapex
} from "../../Redux/actions/UnosiActions";
class index extends Component {
  state = {
    adminAplikacije: "",
    direktor: "",
    username: "",
    mjesto: "",
    password: ""
  };
  componentDidMount() {
    this.props.getAllCapex();
  }
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    this.props.saveAccount(this.state);
    this.props.history.push("/racuni");
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
              type="text"
              name="username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Sifra"
              type="text"
              name="password"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Mjesto"
              type="text"
              name="mjesto"
              margin="normal"
              variant="outlined"
              value={this.state.mjesto}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <FormControl
              style={{
                width: 200,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20
              }}
            >
              <InputLabel>admin</InputLabel>
              <Select
                name="adminAplikacije"
                value={this.state.adminAplikacije}
                onChange={this.handleChange}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: 200,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20
              }}
            >
              <InputLabel>Direktor</InputLabel>
              <Select
                name="direktor"
                value={this.state.direktor}
                onChange={this.handleChange}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              style={{ backgroundColor: "#6aff3d" }}
              type="submit"
            >
              Sačuvaj
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  jedanUnosState: state.all.jedanUnos,
  capexi: state.all.allCapexi,
  user: state.all.user
});

const mapDispatchToProps = { saveAccount, jedanUnos, getAllCapex };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
