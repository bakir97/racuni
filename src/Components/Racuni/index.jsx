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
import { jedanUnos } from "../../Redux/actions/UnosiActions";
import ObicnaTabela from "./obicnaTabela";
import Button from "@material-ui/core/Button";

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
    value: null,
    data: []
  };
  componentDidMount() {
    this.props.getAllData();
    this.props.getAllCapex();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentDidUpdate() {
    if (this.state.data.length === 0 && this.props.data.length > 0) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    const { classes, user } = this.props;
    const { value } = this.state;
    let x = this.state.data.filter(
      (v, i) => this.state.data.indexOf(v.capex.capexSifra) === i
    );
    console.log(this.state.data);

    console.log(x);

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
            <Tab label="Total" />
          </Tabs>
        </AppBar>

        {value === 0 && user.mjesto === "Sarajevo" && (
          <Test
            capexi={this.props.capexi}
            data={this.props.data.filter(
              jedan => jedan.poslovnaJedinica === "Sarajevo"
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
                jedan => jedan.poslovnaJedinica === "Zenica"
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
                jedan => jedan.poslovnaJedinica === "Mostar"
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
                jedan => jedan.poslovnaJedinica === "Tuzla"
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
                jedan => jedan.poslovnaJedinica === "SBK"
              )}
              grad="SBK"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 5 && (
          //pitat ko ovo moze vidjet
          <Test
            capexi={this.props.capexi}
            data={this.props.data}
            grad="Total"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 0 && user.mjesto === "Sarajevo" && (
          <ObicnaTabela
            capexi={this.props.capexi}
            data={this.props.data.filter(
              jedan => jedan.poslovnaJedinica === "Sarajevo"
            )}
            grad="Sarajevo"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 1 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Zenica") && (
            <ObicnaTabela
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan => jedan.poslovnaJedinica === "Zenica"
              )}
              grad="Zenica"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 2 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Mostar") && (
            <ObicnaTabela
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan => jedan.poslovnaJedinica === "Mostar"
              )}
              grad="Mostar"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 3 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "Tuzla") && (
            <ObicnaTabela
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan => jedan.poslovnaJedinica === "Tuzla"
              )}
              grad="Tuzla"
              history={this.props.history}
            />
          )}
        {value === 4 &&
          (user.mjesto === "Sarajevo" || user.mjesto === "SBK") && (
            <ObicnaTabela
              capexi={this.props.capexi}
              data={this.props.data.filter(
                jedan => jedan.poslovnaJedinica === "SBK"
              )}
              grad="SBK"
              history={this.props.history}
              jedanUnos={this.props.jedanUnos}
            />
          )}
        {value === 5 && (
          //pitat ko ovo moze vidjet
          <ObicnaTabela
            capexi={this.props.capexi}
            data={this.props.data}
            grad="Total"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.history.push("/createUnos")}
        >
          Dodaj
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.all.user,
  data: state.all.data,
  capexi: state.all.allCapexi
});

const mapDispatchToProps = { getAllData, jedanUnos, getAllCapex };

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScrollableTabsButtonAuto));
