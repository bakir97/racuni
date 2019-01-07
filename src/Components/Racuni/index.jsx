import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Test from "./test";
import { connect } from "react-redux";
import { getAllData } from "../../Redux/actions/UnosiActions";
import { jedanUnos } from "../../Redux/actions/UnosiActions";

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
    value: 0
  };
  componentDidMount() {
    this.props.getAllData();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Sarajevo" />
            <Tab label="Zenica" />
            <Tab label="Mostar" />
            <Tab label="Tuzla" />
            <Tab label="SBK" />
            <Tab label="Total" />
          </Tabs>
        </AppBar>

        {value === 0 && (
          <Test
            data={this.props.data}
            grad="Sarajevo"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 1 && (
          <Test
            data={this.props.data}
            grad="Zenica"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 2 && (
          <Test
            data={this.props.data}
            grad="Mostar"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 3 && (
          <Test
            data={this.props.data}
            grad="Tuzla"
            history={this.props.history}
          />
        )}
        {value === 4 && (
          <Test
            data={this.props.data}
            grad="SBK"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
        {value === 5 && (
          <Test
            data={this.props.data}
            grad="Total"
            history={this.props.history}
            jedanUnos={this.props.jedanUnos}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.all.data
});

const mapDispatchToProps = { getAllData, jedanUnos };

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScrollableTabsButtonAuto));
