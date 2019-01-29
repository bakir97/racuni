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
  sumaPotrosnjih = grad => {
    return this.props.data.reduce((total, jednaPotrosnja) => {
      if (
        jednaPotrosnja.poslovnaJedinica === grad &&
        this.props.capexi.filter(jedanCapex =>
          jedanCapex.capexSifra.includes(jednaPotrosnja.capex.capexSifra)
        ).length > 0
      ) {
        return total + jednaPotrosnja.potrosnja;
      }
      return total;
    }, 0);
  };

  render() {
    const ukupnaPotrosnjaSvi = this.props.data.reduce(
      (total, jednaPotrosnja) => {
        if (
          this.props.sviGlavniCapexi.filter(
            jedanCapex =>
              jednaPotrosnja.capex.capexSifra.split("-")[0] ===
              jedanCapex.capexSifra
          ).length > 0
        ) {
          return total + jednaPotrosnja.potrosnja;
        }
        return total;
      },
      0
    );
    const SviOdobreniBudzeti = this.props.sviGlavniCapexi.reduce(
      (total, capex) => {
        if (
          moment(capex.datumPocetkaCapexa).month() >= this.props.odBrojMjesec &&
          moment(capex.datumZavrsetkaCapexa).month() <= this.props.doBrojMjesec
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
    const { classes } = this.props;
    return (
      <>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="Total"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
        <Paper className={classes.root}>
          <Table id="table-to-xls" className={classes.table}>
            <TableHead>
              <TableRow style={{ backgroundColor: "#4c74b9" }}>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Capex
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Sarajevo
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Zenica
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Mostar
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Tuzla
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  SBK
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Ukupni trosak{" "}
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Odobreni Budzet
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                >
                  Razlika
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.sviGlavniCapexi.map((row, i) => {
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
                const samoJedanPrikaz = this.props.sviGlavniCapexi.map(
                  jedan => {
                    console.log(array, "array");

                    if (
                      array.filter(
                        capex => capex.capexSifra === jedan.capexSifra
                      ).length <= 0
                    ) {
                      array = [...array, jedan];
                      return jedan;
                    }
                    return null;
                  }
                );
                const odobreniBudzetZbir = this.props.sviGlavniCapexi.reduce(
                  (total, capex) => {
                    if (
                      samoJedanPrikaz[i] &&
                      capex.capexSifra === samoJedanPrikaz[i].capexSifra &&
                      moment(capex.datumPocetkaCapexa).month() >=
                        this.props.odBrojMjesec &&
                      moment(capex.datumZavrsetkaCapexa).month() <=
                        this.props.doBrojMjesec
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
                const potrosnjaZenica = this.props.data.reduce(
                  (total, unos) => {
                    if (
                      samoJedan[i] &&
                      unos.capex.capexSifra === samoJedan[i].capexSifra &&
                      unos.poslovnaJedinica === "Zenica"
                    ) {
                      return total + unos.potrosnja;
                    }
                    return total;
                  },
                  0
                );
                const potrosnjaMostar = this.props.data.reduce(
                  (total, unos) => {
                    if (
                      samoJedan[i] &&
                      unos.capex.capexSifra === samoJedan[i].capexSifra &&
                      unos.poslovnaJedinica === "Mostar"
                    ) {
                      return total + unos.potrosnja;
                    }
                    return total;
                  },
                  0
                );
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
                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                        component="th"
                        scope="row"
                      >
                        {samoJedanPrikaz[i].capexSifra}
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {potrosnjaSarajevo.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        })}{" "}
                        KM
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {potrosnjaZenica.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        })}{" "}
                        KM
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {potrosnjaMostar.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        })}{" "}
                        KM
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {potrosnjaTuzla.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        })}{" "}
                        KM
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {potrosnjaSBK.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        })}{" "}
                        KM
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {ZbirSvih.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        })}{" "}
                        KM
                      </TableCell>

                      <TableCell
                        style={{
                          fontWeight: "bold"
                        }}
                      >
                        {odobreniBudzetZbir.toLocaleString("de-DE", {
                          maximumFractionDigits: 2,
                          minumumFractionDigits: 2
                        })}{" "}
                        KM
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          color:
                            odobreniBudzetZbir - ZbirSvih < 0 ? "red" : "black"
                        }}
                      >
                        {(odobreniBudzetZbir - ZbirSvih).toLocaleString(
                          "de-DE",
                          {
                            maximumFractionDigits: 2,
                            minumumFractionDigits: 2
                          }
                        )}{" "}
                        KM
                      </TableCell>
                    </TableRow>
                  )
                );
              })}
              <TableRow style={{ backgroundColor: "#4c74b9" }}>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  UKUPNO
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  {this.sumaPotrosnjih("Sarajevo").toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  {this.sumaPotrosnjih("Zenica").toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  {this.sumaPotrosnjih("Mostar").toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  {this.sumaPotrosnjih("Tuzla").toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  {this.sumaPotrosnjih("SBK").toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  {ukupnaPotrosnjaSvi.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: "white"
                  }}
                  component="th"
                  scope="row"
                >
                  {SviOdobreniBudzeti.toLocaleString("de-DE", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
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
