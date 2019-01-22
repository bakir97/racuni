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
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./stil.css";
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
    const ukupnaPotrosnjaSvi = this.props.data.reduce(
      (total, jednaPotrosnja) => {
        if (
          this.props.capexi.filter(jedanCapex =>
            jedanCapex.capexSifra.includes(jednaPotrosnja.capex.capexSifra)
          ).length > 0
        ) {
          return total + jednaPotrosnja.potrosnja;
        }
        return total;
      },
      0
    );
    console.log(this.props.capexi, "capexi sto mi trebaju");

    const SviOdobreniBudzeti = this.props.capexi.reduce((total, capex) => {
      if (
        moment(capex.datumPocetkaCapexa).month() >= this.props.odBrojMjesec &&
        moment(capex.datumZavrsetkaCapexa).month() <= this.props.doBrojMjesec
      ) {
        return total + capex[this.props.grad];
      }
      return total;
    }, 0);
    return (
      <>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename={this.props.grad}
          sheet="tablexls"
          buttonText="Download as XLS"
          style={{ backgroundColor: "red" }}
        />
        <Paper className={classes.root}>
          <Table id="table-to-xls" className={classes.table}>
            <TableHead>
              <TableRow style={{ backgroundColor: "#4c74b9" }}>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Capex
                </TableCell>

                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Potrosnja
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Odobreni Budzet
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Razlika
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.capexi.map((row, i) => {
                const findIndex = this.state.datumi.findIndex(
                  datum => datum.capex === row.capexSifra
                );
                const troskovi_datumi = this.props.data.filter(
                  jedanObjekat =>
                    row.capexSifra === jedanObjekat.capex.capexSifra
                );
                const datumiPravi = troskovi_datumi.map(sve => ({
                  ...sve,
                  datumPocetkaSedmice: moment(
                    sve.datumPocetkaSedmice
                  ).valueOf(),
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
                  console.log(trosak.datumPocetkaSedmice, "datuk kraja");

                  if (
                    trosak.datumPocetkaSedmice >= odDatumState &&
                    trosak.datumZavrsetkaSedmice <= doDatumState
                  ) {
                    return total + trosak.potrosnja;
                  }
                  return total;
                }, 0);
                console.log(moment(odDatumState).month(), "sto uporedujemo");

                console.log(troskovi_datumi, "troskovi");
                console.log(datumiPravi, "datumiPravi");
                console.log(najmanji, "najmanjiDatum");
                console.log(najveci, "najveci");
                const proba = this.props.sviCapexi.filter(
                  capex => capex.capexSifra === row.capexSifra
                );
                console.log(proba, "proba");

                const zbirBudzetaMjeseci = proba.reduce((total, capex) => {
                  if (
                    moment(capex.datumPocetkaCapexa).month() >=
                      this.props.odBrojMjesec &&
                    moment(capex.datumZavrsetkaCapexa).month() <=
                      this.props.doBrojMjesec
                  ) {
                    console.log("jednakaaaa", row[this.props.grad]);

                    return total + capex[this.props.grad];
                  }
                  return total;
                }, 0);
                console.log(this.props.odBrojMjesec, "pocetak");
                console.log(this.props.doBrojMjesec, "kraj");

                return (
                  <TableRow key={row._id} style={{ fontWeight: "bold" }}>
                    <TableCell
                      style={{ fontWeight: "bold" }}
                      component="th"
                      scope="row"
                    >
                      {row.capexSifra}
                    </TableCell>

                    <TableCell style={{ fontWeight: "bold" }}>
                      {potrosnja.toLocaleString("de-DE", {
                        maximumFractionDigits: 2,
                        minumumFractionDigits: 2
                      })}{" "}
                      KM
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      {zbirBudzetaMjeseci.toLocaleString("de-DE", {
                        maximumFractionDigits: 2,
                        minumumFractionDigits: 2
                      })}{" "}
                      KM
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color:
                          zbirBudzetaMjeseci - potrosnja < 0 ? "red" : "black"
                      }}
                    >
                      {(zbirBudzetaMjeseci - potrosnja).toLocaleString(
                        "de-DE",
                        {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        }
                      )}{" "}
                      KM
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow style={{ backgroundColor: "#4c74b9" }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  UKUPNO
                </TableCell>

                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  {ukupnaPotrosnjaSvi.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  {SviOdobreniBudzeti.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    color:
                      SviOdobreniBudzeti - ukupnaPotrosnjaSvi < 0
                        ? "red"
                        : "white"
                  }}
                >
                  {(SviOdobreniBudzeti - ukupnaPotrosnjaSvi).toLocaleString(
                    "de-DE",
                    {
                      maximumFractionDigits: 2,
                      minumumFractionDigits: 2
                    }
                  )}{" "}
                  KM
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(test));
