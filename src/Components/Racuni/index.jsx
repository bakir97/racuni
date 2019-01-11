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
import { Grid, TextField } from "@material-ui/core";
import ObicnaTabela from "./obicnaTabela";
import Button from "@material-ui/core/Button";
import moment from "moment";
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
    do: null
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

    console.log(test, "test filter");

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
              label="Sarajevo"
              disabled={user.mjesto === "Sarajevo" ? false : true}
            />
            <Tab
              label="Zenica"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "Zenica"
                  ? false
                  : true
              }
            />
            <Tab
              label="Mostar"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "Mostar"
                  ? false
                  : true
              }
            />
            <Tab
              label="Tuzla"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "Tuzla"
                  ? false
                  : true
              }
            />
            <Tab
              label="SBK"
              disabled={
                user.mjesto === "Sarajevo" || user.mjesto === "SBK"
                  ? false
                  : true
              }
            />
            <Tab
              label="Total"
              disabled={user.mjesto === "Sarajevo" ? false : true}
            />
            <Button
              style={{ marginLeft: "auto", marginRight: 20 }}
              onClick={this.logout}
            >
              Logout
            </Button>
          </Tabs>
        </AppBar>
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
                : moment(Math.min(...datumiPretvoreniOd)).format("YYYY-MM-DD")
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
                    moment(Math.max(...datumiPretvoreniDo)).format("YYYY-MM-DD")
                  ).format("YYYY-MM-DD")
            }
            onChange={e => this.handleChangeInput(e)}
            style={{ marginRight: 10 }}
          />
        </Grid>
        {value === 0 && user.mjesto === "Sarajevo" && (
          <Test
            capexi={this.props.capexi}
            data={this.props.data.filter(
              jedan =>
                jedan.poslovnaJedinica === "Sarajevo" &&
                moment(jedan.datumPocetkaSedmice).valueOf() >=
                  moment(this.state.od || 0).valueOf() &&
                moment(jedan.datumZavrsetkaSedmice).valueOf() <= doDatumMoment
            )}
            grad="Sarajevo"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 1 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Zenica") && (
            <Test
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "Zenica" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() <= doDatumMoment
              )}
              grad="Zenica"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 2 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Mostar") && (
            <Test
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "Mostar" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() <= doDatumMoment
              )}
              grad="Mostar"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 3 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Tuzla") && (
            <Test
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "Tuzla" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() <= doDatumMoment
              )}
              grad="Tuzla"
              history={this.props.history}
            />
          )}
        {value === 4 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "SBK") && (
            <Test
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan =>
                  jedan.poslovnaJedinica === "SBK" &&
                  moment(jedan.datumPocetkaSedmice).valueOf() >=
                    moment(this.state.od || 0).valueOf() &&
                  moment(jedan.datumZavrsetkaSedmice).valueOf() <= doDatumMoment
              )}
              grad="SBK"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 5 && user.mjesto === "Sarajevo" && (
          //pitat ko ovo moze vidjet
          <Test
            capexi={this.props.capexi}
            data={this.props.data.filter(
              jedan =>
                moment(jedan.datumPocetkaSedmice).valueOf() >=
                  moment(this.state.od || 0).valueOf() &&
                moment(jedan.datumZavrsetkaSedmice).valueOf() <= doDatumMoment
            )}
            grad="Total"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        <Typography style={{ marginTop: 20 }}>Svi Unosi</Typography>
        {value === 0 && user.mjesto === "Sarajevo" && (
          <>
            <ObicnaTabela
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan => jedan.poslovnaJedinica === "Sarajevo"
              )}
              grad="Sarajevo"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("/createUnos")}
            >
              Dodaj
            </Button>
          </>
        )}
        {value === 1 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Zenica") && (
            <>
              <ObicnaTabela
                capexi={this.props.capexi}
                data={this.props.data.filter(
                  jedan => jedan.poslovnaJedinica === "Zenica"
                )}
                grad="Zenica"
                history={this.props.history}
                jedanUnos={this.props.jedanUnos}
              />
              <Button
                style={{ marginTop: 20 }}
                variant="contained"
                color="primary"
                onClick={() => this.props.history.push("/createUnos")}
              >
                Dodaj
              </Button>
            </>
          )}
        {value === 2 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Mostar") && (
            <>
              <ObicnaTabela
                capexi={this.props.capexi}
                data={this.props.data.filter(
                  jedan => jedan.poslovnaJedinica === "Mostar"
                )}
                grad="Mostar"
                history={this.props.history}
                jedanUnos={this.props.jedanUnos}
              />
              <Button
                style={{ marginTop: 20 }}
                variant="contained"
                color="primary"
                onClick={() => this.props.history.push("/createUnos")}
              >
                Dodaj
              </Button>
            </>
          )}
        {value === 3 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Tuzla") && (
            <>
              <ObicnaTabela
                capexi={this.props.capexi}
                data={this.props.data.filter(
                  jedan => jedan.poslovnaJedinica === "Tuzla"
                )}
                grad="Tuzla"
                history={this.props.history}
              />
              <Button
                style={{ marginTop: 20 }}
                variant="contained"
                color="primary"
                onClick={() => this.props.history.push("/createUnos")}
              >
                Dodaj
              </Button>
            </>
          )}
        {value === 4 && (user.mjesto === "Sarajevo" || user.mjesto === "SBK") && (
          <>
            <ObicnaTabela
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan => jedan.poslovnaJedinica === "SBK"
              )}
              grad="SBK"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("/createUnos")}
            >
              Dodaj
            </Button>
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
