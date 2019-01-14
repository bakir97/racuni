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
  sacuvajPodatke,
  jedanUnos,
  getAllCapex
} from "../../Redux/actions/UnosiActions";
class index extends Component {
  state = {
    datumPocetkaSedmice: moment().format("YYYY-MM-DD"),
    datumZavrsetkaSedmice: moment().format("YYYY-MM-DD"),
    potrosnja: 0,
    capex: { capexSifra: "" }
  };
  componentDidMount() {
    this.props.getAllCapex();
  }
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();

    this.props.sacuvajPodatke({
      ...this.state,
      capex: this.props.capexi.filter(
        capex => capex.capexSifra === this.state.capex.capexSifra
      )[0]._id,
      poslovnaJedinica: this.props.user.mjesto
    });
    this.props.history.push("/racuni");
  };

  handleChange = e => {
    this.setState({
      capex: { ...this.state.capex, capexSifra: e.target.value }
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
              label="Početak sedmice"
              type="date"
              name="datumPocetkaSedmice"
              margin="normal"
              variant="outlined"
              value={this.state.datumPocetkaSedmice}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Kraj sedmice"
              type="date"
              name="datumZavrsetkaSedmice"
              margin="normal"
              variant="outlined"
              value={this.state.datumZavrsetkaSedmice}
              onChange={e => this.handleChangeInput(e)}
              style={{ marginRight: 10 }}
            />
            {this.state.capex && (
              <FormControl
                style={{
                  width: 200,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20
                }}
              >
                <InputLabel htmlFor="age-simple">Capex</InputLabel>
                <Select
                  value={this.state.capex.capexSifra}
                  onChange={this.handleChange}
                  inputProps={{
                    capex: "age",
                    id: "age-simple"
                  }}
                >
                  {this.props.capexi.map(capex => (
                    <MenuItem key={capex._id} value={capex.capexSifra}>
                      {capex.capexSifra}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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

const mapDispatchToProps = { sacuvajPodatke, jedanUnos, getAllCapex };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
