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
              <TableCell>Sarajevo</TableCell>
              <TableCell>Zenica</TableCell>
              <TableCell>Mostar</TableCell>
              <TableCell>Tuzla</TableCell>
              <TableCell>SBK</TableCell>
              <TableCell>Ukupni trosak </TableCell>
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
              let array = [];
              const samoJedan = this.props.capexi.map(jedan => {
                console.log(array, "array");

                if (
                  array.filter(capex => capex.capexSifra === jedan.capexSifra)
                    .length <= 0
                ) {
                  array = [...array, jedan];
                  return jedan;
                }
                return null;
              });
              const odobreniBudzetZbir = this.props.capexi.reduce(
                (total, capex) => {
                  if (
                    samoJedan[i] &&
                    capex.capexSifra === samoJedan[i].capexSifra
                  ) {
                    return (
                      total +
                      capex.budzetSarajevo +
                      capex.budzetZenica +
                      capex.budzetMostar +
                      capex.budzetTuzla +
                      capex.budzetSBK
                    );
                  }
                  return total;
                },
                0
              );
              const potrosnjaSarajevo = this.props.data.reduce(
                (total, unos) => {
                  if (
                    samoJedan[i] &&
                    unos.capex.capexSifra === samoJedan[i].capexSifra &&
                    unos.poslovnaJedinica === "Sarajevo"
                  ) {
                    return total + unos.potrosnja;
                  }
                  return total;
                },
                0
              );
              const potrosnjaZenica = this.props.data.reduce((total, unos) => {
                if (
                  samoJedan[i] &&
                  unos.capex.capexSifra === samoJedan[i].capexSifra &&
                  unos.poslovnaJedinica === "Zenica"
                ) {
                  return total + unos.potrosnja;
                }
                return total;
              }, 0);
              const potrosnjaMostar = this.props.data.reduce((total, unos) => {
                if (
                  samoJedan[i] &&
                  unos.capex.capexSifra === samoJedan[i].capexSifra &&
                  unos.poslovnaJedinica === "Mostar"
                ) {
                  return total + unos.potrosnja;
                }
                return total;
              }, 0);
              const potrosnjaTuzla = this.props.data.reduce((total, unos) => {
                if (
                  samoJedan[i] &&
                  unos.capex.capexSifra === samoJedan[i].capexSifra &&
                  unos.poslovnaJedinica === "Tuzla"
                ) {
                  return total + unos.potrosnja;
                }
                return total;
              }, 0);
              const potrosnjaSBK = this.props.data.reduce((total, unos) => {
                if (
                  samoJedan[i] &&
                  unos.capex.capexSifra === samoJedan[i].capexSifra &&
                  unos.poslovnaJedinica === "SBK"
                ) {
                  return total + unos.potrosnja;
                }
                return total;
              }, 0);
              const ZbirSvih =
                potrosnjaSarajevo +
                potrosnjaZenica +
                potrosnjaMostar +
                potrosnjaTuzla +
                potrosnjaSBK;
              return (
                samoJedan[i] && (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {samoJedan[i].capexSifra}
                    </TableCell>
                    <TableCell>{potrosnjaSarajevo.toFixed(2)} KM</TableCell>
                    <TableCell>{potrosnjaZenica.toFixed(2)} KM</TableCell>
                    <TableCell>{potrosnjaMostar.toFixed(2)} KM</TableCell>
                    <TableCell>{potrosnjaTuzla.toFixed(2)} KM</TableCell>
                    <TableCell>{potrosnjaSBK.toFixed(2)} KM</TableCell>
                    <TableCell>{ZbirSvih.toFixed(2)} KM</TableCell>

                    <TableCell>{odobreniBudzetZbir.toFixed(2)} KM</TableCell>
                    <TableCell>
                      {(odobreniBudzetZbir - ZbirSvih).toFixed(2)} KM
                    </TableCell>
                  </TableRow>
                )
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