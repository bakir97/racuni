import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
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

class test extends Component {
  state = {
    datumi: []
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Capex</TableCell>

              <TableCell>Potrosnja</TableCell>
              <TableCell>Odobreni Budzet</TableCell>
              <TableCell>Razlika</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.capexi.map((row, i) => {
              const findIndex = this.state.datumi.findIndex(
                datum => datum.capex === row.capexSifra
              );
              const troskovi_datumi = this.props.data.filter(
                jedanObjekat => row.capexSifra === jedanObjekat.capex.capexSifra
              );
              const datumiPravi = troskovi_datumi.map(sve => ({
                ...sve,
                datumPocetkaSedmice: moment(sve.datumPocetkaSedmice).valueOf(),
                datumZavrsetkaSedmice: moment(
                  sve.datumZavrsetkaSedmice
                ).valueOf()
              }));
              let odDatumState = 0;
              let doDatumState = 9999999999999999999999999999;
              if (
                this.state.datumi[findIndex] &&
                this.state.datumi[findIndex].od
              ) {
                odDatumState = moment(
                  this.state.datumi[findIndex].od
                ).valueOf();
              }
              if (
                this.state.datumi[findIndex] &&
                this.state.datumi[findIndex].do
              ) {
                doDatumState = moment(
                  this.state.datumi[findIndex].do
                ).valueOf();
              }
              console.log(odDatumState, "test");
              const najmanjiDatum = datumiPravi.map(
                datumiSvi => datumiSvi.datumPocetkaSedmice
              );
              const najmanji = Math.min(...najmanjiDatum);
              const najveciDatumi = datumiPravi.map(
                datumiSvi => datumiSvi.datumZavrsetkaSedmice
              );
              const najveci = Math.max(...najveciDatumi);

              const potrosnja = datumiPravi.reduce((total, trosak) => {
                if (
                  trosak.datumPocetkaSedmice >= odDatumState &&
                  trosak.datumZavrsetkaSedmice <= doDatumState
                ) {
                  return total + trosak.potrosnja;
                }
                return total;
              }, 0);

              console.log(troskovi_datumi, "troskovi");
              console.log(datumiPravi, "datumiPravi");
              console.log(najmanji, "najmanjiDatum");
              console.log(najveci, "najveci");

              return (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.capexSifra}
                  </TableCell>

                  <TableCell>{potrosnja.toFixed(2)} KM</TableCell>
                  <TableCell>{row.odobreniBudzet.toFixed(2)} KM</TableCell>
                  <TableCell>
                    {(row.odobreniBudzet - potrosnja).toFixed(2)} KM
                  </TableCell>
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
