import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Test from "./capexiTabela";
import { connect } from "react-redux";
import { getAllData, getAllCapex } from "../../Redux/actions/UnosiActions";
import { jedanUnos, success } from "../../Redux/actions/UnosiActions";
import { loginUser } from "../../Redux/actions/LoginAction";
import { Grid, TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import ObicnaTabela from "./obicnaTabela";
import Button from "@material-ui/core/Button";
import moment from "moment";
import TotalTabela from "./totalTabela";
const gradovi = ["Sarajevo", "Zenica", "Mostar", "Tuzla", "SBK"];
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: gradovi.findIndex(grad => grad === this.props.user.mjesto),
    data: [],
    open: true,
    od: null,
    do: null,
    capexi: [],
    prikaziCapexFilter: false
  };
  componentDidMount() {
    this.props.getAllData();
    this.props.getAllCapex();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidUpdate(prevProps) {
    if (this.state.data.length === 0 && this.props.data.length > 0) {
      this.setState({ data: this.props.data });
    }
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };
  logout = () => {
    localStorage.removeItem("user");
    this.props.loginUser({});
    this.props.history.push("/");
  };
  inputBoxovi = () => {
    let array = [];
    const samoJedan = this.props.capexi
      .map(jedan => {
        if (
          array.filter(capex => capex.capexSifra === jedan.capexSifra).length <=
          0
        ) {
          array = [...array, jedan];
          return jedan;
        }
        return null;
      })
      .filter(jedan => jedan !== null);
    console.log(samoJedan, "samo jedan bi trebao");

    return samoJedan.map(capex => (
      <FormControlLabel
        style={{ margin: 15, marginLeft: 10 }}
        control={
          <Checkbox
            name={capex.capexSifra}
            checked={
              this.state.capexi.filter(
                capexState => capexState.capexSifra === capex.capexSifra
              ).length > 0
            }
            onChange={() => this.changeCapexe(capex)}
            value={capex.capexSifra}
          />
        }
        label={capex.capexSifra}
      />
    ));
  };
  changeCapexe = capex => {
    if (
      this.state.capexi.filter(
        capexState => capexState.capexSifra === capex.capexSifra
      ).length > 0
    ) {
      return this.setState({
        capexi: this.state.capexi.filter(
          capexState => capexState.capexSifra !== capex.capexSifra
        )
      });
    }
    this.setState({ capexi: [...this.state.capexi, capex] });
  };
  render() {
    const { classes, user } = this.props;
    const { value } = this.state;
    const datumiPretvoreniOd = this.props.data.map(jedan =>
      moment(jedan.datumPocetkaSedmice).valueOf()
    );
    const datumiPretvoreniDo = this.props.data.map(jedan =>
      moment(jedan.datumZavrsetkaSedmice).valueOf()
    );
    console.log(Math.min(datumiPretvoreniOd), "datumo");
    let doDatumMoment = moment(this.state.do || 0).valueOf();
    if (doDatumMoment === 0) {
      doDatumMoment = 99999999999999999;
    }
    const test = this.props.data.filter(jedan => {
      console.log(moment(jedan.datumPocetkaSedmice).valueOf());
      console.log(moment(this.state.od || 0).valueOf(), "testiram");
      console.log(
        moment(jedan.datumPocetkaSedmice).valueOf() >=
          moment(this.state.od || 0).valueOf(),
        "relacija"
      );

      if (
        jedan.poslovnaJedinica === "Sarajevo" &&
        moment(jedan.datumPocetkaSedmice).valueOf() >=
          moment(this.state.od || 0).valueOf() &&
        moment(jedan.datumZavrsetkaSedmice).valueOf() <= doDatumMoment
      ) {
        return jedan;
      }
      return null;
    });

    console.log(moment(this.state.od).month(), "test filter");
    console.log(isNaN(moment(this.state.od).month(), "testtss"));

    let datumBroj =
      isNaN(moment(this.state.od).month()) === false
        ? moment(this.state.od).month()
        : moment(Math.min(...datumiPretvoreniOd)).month();
    const odBrojMjesec =
      isNaN(moment(this.state.od).month()) === false
        ? moment(this.state.od).month()
        : moment(Math.min(...datumiPretvoreniOd)).month();
    const doBrojMjesec =
      isNaN(moment(this.state.do).month()) === false
        ? moment(this.state.do).month()
        : moment(Math.max(...datumiPretvoreniOd)).month();

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              style={{ fontWeight: "bold" }}
              label="Sarajevo"
              disabled={user.mjesto === "Sarajevo" ? false : true}
            />
            <Tab
              style={{ fontWeight: "bold" }}
              label="Zenica"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "Zenica"
                  ? false
                  : true
              }
            />
            <Tab
              style={{ fontWeight: "bold" }}
              label="Mostar"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "Mostar"
                  ? false
                  : true
              }
            />
            <Tab
              style={{ fontWeight: "bold" }}
              label="Tuzla"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "Tuzla"
                  ? false
                  : true
              }
            />
            <Tab
              style={{ fontWeight: "bold" }}
              label="SBK"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "SBK"
                  ? false
                  : true
              }
            />
            <Tab
              style={{ fontWeight: "bold" }}
              label="Total"
              disabled={user.mjesto === "Sarajevo" ? false : true}
            />
            <Tab style={{ fontWeight: "bold" }} label="Svi Unosi" />
            <Button
              style={{ marginLeft: "auto", marginRight: 20 }}
              onClick={this.logout}
            >
              Logout
            </Button>
            {this.props.user.adminAplikacije && (
              <>
                <Button
                  style={{ marginRight: 20 }}
                  onClick={() => this.props.history.push("/createCapex")}
                >
                  Novi Capex
                </Button>
                <Button
                  style={{ marginRight: 20 }}
                  onClick={() => this.props.history.push("/createProfile")}
                >
                  Novi Profil
                </Button>
              </>
            )}
          </Tabs>
        </AppBar>
        {value !== 6 && (
          <>
            <Grid container alignItems="center">
              <Typography style={{ marginRight: 20 }}>
                Filter po datumima:
              </Typography>
              <Typography style={{ marginRight: 20 }}>Od</Typography>

              <TextField
                type="date"
                name="od"
                margin="normal"
                variant="outlined"
                value={
                  this.state.od
                    ? this.state.od
                    : moment(Math.min(...datumiPretvoreniOd)).format(
                        "YYYY-MM-DD"
                      )
                }
                onChange={e => this.handleChangeInput(e)}
                style={{ marginRight: 20 }}
              />
              <Typography style={{ marginRight: 20 }}>Do</Typography>

              <TextField
                type="date"
                name="do"
                margin="normal"
                variant="outlined"
                value={
                  this.state.do
                    ? this.state.do
                    : moment(
                        moment(Math.max(...datumiPretvoreniDo)).format(
                          "YYYY-MM-DD"
                        )
                      ).format("YYYY-MM-DD")
                }
                onChange={e => this.handleChangeInput(e)}
                style={{ marginRight: 10 }}
              />
              {this.state.value ===
                gradovi.findIndex(grad => grad === this.props.user.mjesto) &&
                !this.props.user.direktor && (
                  <Button
                    style={{
                      marginLeft: "auto",
                      marginTop: 10,
                      marginRight: 10,
                      backgroundColor: "green",
                      color: "white"
                    }}
                    variant="contained"
                    onClick={() => this.props.history.push("/createUnos")}
                  >
                    Novi unos
                  </Button>
                )}
            </Grid>
            <Button
              style={{ marginRight: 20 }}
              onClick={() =>
                this.setState(prevState => ({
                  prikaziCapexFilter: !prevState.prikaziCapexFilter
                }))
              }
            >
              {this.state.prikaziCapexFilter
                ? "Zatvori filter"
                : "Filter za capex"}
            </Button>
            {this.state.prikaziCapexFilter && (
              <div
                style={{
                  height: 100,
                  width: 200,
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column"
                }}
                container
                direction="column"
              >
                {this.inputBoxovi()}
              </div>
            )}
          </>
        )}
        {value === 0 && user.mjesto === "Sarajevo" && (
          <Test
            sviCapexi={this.props.capexi}
            odBrojMjesec={odBrojMjesec}
            doBrojMjesec={doBrojMjesec}
            capexi={
              this.state.capexi.length > 0
                ? this.state.capexi.filter(
                    capex =>
                      moment(capex.datumPocetkaCapexa).month() === datumBroj
                  )
                : this.props.capexi.filter(
                    capex =>
                      moment(capex.datumPocetkaCapexa).month() === datumBroj
                  )
            }
            data={this.props.data.filter(
              jedan =>
                jedan.poslovnaJedinica === "Sarajevo" &&
                moment(jedan.datumPocetkaSedmice).valueOf() >=
                  moment(this.state.od || 0).valueOf() &&
                moment(jedan.datumZavrsetkaSedmice).valueOf() - 86400000 <=
                  doDatumMoment
            )}
            grad="budzetSarajevo"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 1 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Zenica") && (
            <Test
              sviCapexi={this.props.capexi}
              odBrojMjesec={odBrojMjesec}
              doBrojMjesec={doBrojMjesec}
              capexi={
                this.state.capexi.length > 0
                  ? this.state.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.Zenica === true
                    )
                  : this.props.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.Zenica === true
                    )
              }
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "Zenica" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() - 86400000 <=
                    doDatumMoment
              )}
              grad="budzetZenica"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 2 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Mostar") && (
            <Test
              sviCapexi={this.props.capexi}
              odBrojMjesec={odBrojMjesec}
              doBrojMjesec={doBrojMjesec}
              capexi={
                this.state.capexi.length > 0
                  ? this.state.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.Mostar === true
                    )
                  : this.props.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.Mostar === true
                    )
              }
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "Mostar" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() - 86400000 <=
                    doDatumMoment
              )}
              grad="budzetMostar"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 3 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Tuzla") && (
            <Test
              sviCapexi={this.props.capexi}
              odBrojMjesec={odBrojMjesec}
              doBrojMjesec={doBrojMjesec}
              capexi={
                this.state.capexi.length > 0
                  ? this.state.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.Tuzla === true
                    )
                  : this.props.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.Tuzla === true
                    )
              }
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "Tuzla" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() - 86400000 <=
                    doDatumMoment
              )}
              grad="budzetTuzla"
              history={this.props.history}
            />
          )}
        {value === 4 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "SBK") && (
            <Test
              odBrojMjesec={odBrojMjesec}
              doBrojMjesec={doBrojMjesec}
              sviCapexi={this.props.capexi}
              capexi={
                this.state.capexi.length > 0
                  ? this.state.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.SBK === true
                    )
                  : this.props.capexi.filter(
                      capex =>
                        moment(capex.datumPocetkaCapexa).month() ===
                          datumBroj && capex.SBK === true
                    )
              }
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "SBK" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() - 86400000 <=
                    doDatumMoment
              )}
              grad="budzetSBK"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 5 && user.mjesto === "Sarajevo" && (
          <TotalTabela
            odBrojMjesec={odBrojMjesec}
            doBrojMjesec={doBrojMjesec}
            capexi={
              this.state.capexi.length > 0
                ? this.state.capexi
                : this.props.capexi
            }
            data={this.props.data.filter(
              jedan =>
                moment(jedan.datumPocetkaSedmice).valueOf() >=
                  moment(this.state.od || 0).valueOf() &&
                moment(jedan.datumZavrsetkaSedmice).valueOf() - 86400000 <=
                  doDatumMoment
            )}
            // data={this.props.data}
            grad="Total"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}

        {value === 6 && (
          <>
            <ObicnaTabela
              capexi={this.props.capexi}
              data={
                this.props.user.mjesto === "Sarajevo"
                  ? this.props.data
                  : this.props.data.filter(
                      jedan => jedan.poslovnaJedinica === this.props.user.mjesto
                    )
              }
              mjesto={this.props.user.mjesto}
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.all.user,
  data: state.all.data,
  capexi: state.all.allCapexi,
  sucessState: state.all.success
});

const mapDispatchToProps = {
  getAllData,
  jedanUnos,
  getAllCapex,
  success,
  loginUser
};

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScrollableTabsButtonAuto));
