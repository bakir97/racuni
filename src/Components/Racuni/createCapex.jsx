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
  storeCapex,
  jedanUnos,
  getAllCapex
} from "../../Redux/actions/UnosiActions";
class index extends Component {
  state = {
    datumPocetkaCapexa: moment().format("YYYY-MM-DD"),
    datumZavrsetkaCapexa: moment().format("YYYY-MM-DD"),
    capexSifra: "",
    budzetSarajevo: "",
    budzetZenica: "",
    budzetMostar: "",
    budzetTuzla: "",
    budzetSBK: ""
  };
  componentDidMount() {
    this.props.getAllCapex();
  }

  submit = e => {
    e.preventDefault();
    this.props.storeCapex(this.state);
    this.props.history.push("/racuni");
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
          <Grid container direction="column">
            <TextField
              label="Početak capexa"
              type="date"
              name="datumPocetkaCapexa"
              margin="normal"
              variant="outlined"
              value={this.state.datumPocetkaCapexa}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Kraj capexa"
              type="date"
              name="datumZavrsetkaCapexa"
              margin="normal"
              variant="outlined"
              value={this.state.datumZavrsetkaCapexa}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Capex Sifra"
              type="text"
              name="capexSifra"
              margin="normal"
              variant="outlined"
              onChange={e => this.handleChangeInput(e)}
              value={this.state.capexSifra}
              style={{ marginRight: 10 }}
            />
            <Grid container style={{ width: "100%" }} justify="center">
              <TextField
                label="Budzet Sarajevo"
                type="number"
                name="budzetSarajevo"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChangeInput(e)}
                value={this.state.budzetSarajevo}
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Budzet Zenica"
                type="number"
                name="budzetZenica"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChangeInput(e)}
                value={this.state.budzetZenica}
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Budzet Mostar"
                type="number"
                name="budzetMostar"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChangeInput(e)}
                value={this.state.budzetMostar}
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Budzet Tuzla"
                type="number"
                name="budzetTuzla"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChangeInput(e)}
                value={this.state.budzetTuzla}
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Budzet SBK"
                type="number"
                name="budzetSBK"
                margin="normal"
                variant="outlined"
                onChange={e => this.handleChangeInput(e)}
                value={this.state.budzetSBK}
                style={{ marginRight: 10 }}
              />
            </Grid>
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

const mapDispatchToProps = { storeCapex, jedanUnos, getAllCapex };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
