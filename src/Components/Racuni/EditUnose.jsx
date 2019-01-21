import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { sacuvajPodatke, jedanUnos } from "../../Redux/actions/UnosiActions";
const gradovi = ["Sarajevo", "Zenica", "Mostar", "Tuzla", "SBK"];
class index extends Component {
  state = {
    ...this.props.jedanUnosState,
    datumPocetkaSedmice: moment(
      this.props.jedanUnosState.datumPocetkaSedmice
    ).format("YYYY-MM-DD"),
    datumZavrsetkaSedmice: moment(
      this.props.jedanUnosState.datumZavrsetkaSedmice
    ).format("YYYY-MM-DD"),
    poslovnaJedinica: this.props.jedanUnosState.poslovnaJedinica
  };
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    const capexiJednaki = this.props.capexi.filter(
      capex => capex.capexSifra === this.state.capex.capexSifra
    );
    const praviCapex = capexiJednaki.filter(
      capex =>
        moment(capex.datumPocetkaCapexa).month() ===
        moment(this.state.datumPocetkaSedmice).month()
    );
    this.props.sacuvajPodatke({
      ...this.state,
      capex: praviCapex[0]._id,
      poslovnaJedinica:
        this.props.user.mjesto === "Sarajevo"
          ? this.state.poslovnaJedinica
          : this.props.user.mjesto
    });
    this.props.history.push("/racuni");
  };
  componentWillUnmount() {
    this.props.jedanUnos();
  }
  componentDidMount() {
    if (Object.keys(this.props.jedanUnosState).length <= 0) {
      this.props.history.push("/racuni");
    }
  }
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
            {this.props.user.mjesto === "Sarajevo" && (
              <FormControl
                style={{
                  width: 200,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20
                }}
              >
                <InputLabel htmlFor="jedinica">Poslovna Jedinica</InputLabel>
                <Select
                  name="poslovnaJedinica"
                  value={this.state.poslovnaJedinica}
                  onChange={this.handleChangeInput}
                  inputProps={{
                    jedinica: "age",
                    id: "jedinica"
                  }}
                >
                  {gradovi.map(grad => (
                    <MenuItem key={grad} value={grad}>
                      {grad}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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
                  <MenuItem value={this.props.jedanUnosState.capex.capexSifra}>
                    {this.props.jedanUnosState.capex.capexSifra}
                  </MenuItem>
                  {this.props.capexi
                    .filter(
                      capex =>
                        this.props.jedanUnosState.capex.capexSifra !==
                        capex.capexSifra
                    )
                    .map(capex => (
                      <MenuItem value={capex.capexSifra}>
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

const mapDispatchToProps = { sacuvajPodatke, jedanUnos };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
