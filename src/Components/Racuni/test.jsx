import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

class test extends Component {
  state = {
    od: "",
    do: ""
  };
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Capex</TableCell>
              <TableCell align="right">Od</TableCell>
              <TableCell align="right">Do</TableCell>
              <TableCell align="right">Ostalo</TableCell>
              <TableCell align="right">Ostalo</TableCell>
              <TableCell align="right">Ostalo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.capexi.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.capexSifra}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="date"
                      name="od"
                      margin="normal"
                      variant="outlined"
                      value={this.state.od}
                      onChange={e => this.handleChangeInput(e, row.capexSifra)}
                      style={{ marginRight: 10 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="date"
                      name="do"
                      margin="normal"
                      variant="outlined"
                      value={this.state.do}
                      onChange={e => this.handleChangeInput(e, row.capexSifra)}
                      style={{ marginRight: 10 }}
                    />
                  </TableCell>
                  <TableCell align="right">423434543</TableCell>
                  <TableCell align="right">{row.odobredBudzet}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(test));
