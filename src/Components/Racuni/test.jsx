import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { capexiIDatumi } from "../../Redux/actions/UnosiActions";
import moment from "moment";
const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  }
});
let capexiArray = [];
let odDatum = [];
let doDatum = [];

class MuiVirtualizedTable extends React.PureComponent {
  state = {
    odDatum: null,
    doDatum: null
  };
  handleChangeInput = (e, data) => {
    if (e.target.name === "odDatum") {
      const traziIndex = odDatum.findIndex(jedan => jedan.capex === data);

      if (traziIndex > -1) {
        console.log(odDatum[traziIndex].datumi.doDatum);

        odDatum[traziIndex] = {
          datumi: {
            odDatum: e.target.value,
            doDatum:
              odDatum[traziIndex] && odDatum[traziIndex].datumi
                ? odDatum[traziIndex].datumi.doDatum || ""
                : ""
          },
          capex: data
        };
      } else {
        odDatum = [
          ...odDatum,
          {
            datumi: {
              odDatum: e.target.value,
              doDatum:
                odDatum[traziIndex] && odDatum[traziIndex].datumi
                  ? odDatum[traziIndex].datumi.doDatum || ""
                  : ""
            },
            capex: data
          }
        ];
      }
    } else {
      const traziIndex = odDatum.findIndex(jedan => jedan.capex === data);
      if (traziIndex > -1) {
        console.log(odDatum[traziIndex].datumi.doDatum);

        odDatum[traziIndex] = {
          datumi: {
            doDatum: e.target.value,
            odDatum:
              odDatum[traziIndex] && odDatum[traziIndex].datumi
                ? odDatum[traziIndex].datumi.odDatum || ""
                : ""
          },
          capex: data
        };
      } else {
        odDatum = [
          ...odDatum,
          {
            datumi: {
              doDatum: e.target.value,
              odDatum:
                odDatum[traziIndex] && odDatum[traziIndex].datumi
                  ? odDatum[traziIndex].datumi.odDatum || ""
                  : ""
            },
            capex: data
          }
        ];
      }
    }
    console.log(odDatum, "oddat");
    console.log(doDatum, "doDatum");

    console.log(data);
    const newDate = new Date(e.target.value);
    console.log(newDate.getTime());
    this.props.capexiIDatumi(odDatum);
    this.setState({ [e.target.name]: e.target.value });
  };
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    const arrayPocetak = this.props.data.map(
      jedan => new Date(jedan.datumPocetkaSedmice)
    );
    const datumiSortirani = arrayPocetak.sort(function(a, b) {
      return a > b ? -1 : a < b ? 1 : 0;
    });
    const arrayKraj = this.props.data.map(
      jedan => new Date(jedan.datumZavrsetkaSedmice)
    );
    const datumiSortiraniKraj = arrayKraj.sort(function(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    });
    // this.setState({
    //   [columnIndex + 1000]: moment(datumiSortirani[0]).format("YYYY-MM-DD"),
    //   [columnIndex + 2000]: moment(datumiSortiraniKraj[0]).format("YYYY-MM-DD")
    // });
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
        {columnIndex === 0 && (
          <>
            <TextField
              label="Username"
              type="date"
              name="odDatum"
              margin="normal"
              value={this.state.od}
              onChange={e => this.handleChangeInput(e, cellData)}
              style={{ marginLeft: 100 }}
              InputProps={{
                disableUnderline: true
              }}
            />
            <TextField
              label="Username"
              type="date"
              name="doDatum"
              margin="normal"
              value={this.state.do}
              onChange={e => this.handleChangeInput(e, cellData)}
              InputProps={{
                disableUnderline: true
              }}
            />
          </>
        )}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: "asc",
      [SortDirection.DESC]: "desc"
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, dataKey, ...other },
                index
              ) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = cellRendererProps =>
                    this.cellRenderer({
                      cellData: cellContentRenderer(cellRendererProps),
                      columnIndex: index
                    });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index
                      })
                    }
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              }
            )}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56
};
const mapStateToProps = state => ({
  data: state.all.data,
  datumiCapexa: state.all.capexiDatumi
});

const mapDispatchToProps = { capexiIDatumi };
const WrappedVirtualizedTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MuiVirtualizedTable));

function ReactVirtualizedTable({
  data,
  grad,
  history,
  jedanUnos,
  capexi,
  datumiCapexa
}) {
  console.log(data);
  const capexiArray = capexi.map(jedan => ({
    ...jedan,
    budzet: `${jedan.odobreniBudzet} KM`,
    potrosnja:
      data.length > 0
        ? data.reduce((total, jedanObjekat) => {
            const sekundeDatuma = new Date(
              jedanObjekat.datumPocetkaSedmice
            ).getTime();
            const sekundeDatumaKraj = new Date(
              jedanObjekat.datumZavrsetkaSedmice
            ).getTime();
            const capexPravi = datumiCapexa.filter(
              jedanCapex => jedanCapex.capex === jedan.capexSifra
            );
            console.log(capexPravi, "capexPravi");

            let sekundeOdDatuma = 0;
            let sekundeDoDatuma = 999999999999999999999999998999;
            if (capexPravi.length > 0) {
              if (capexPravi[0].datumi && capexPravi[0].datumi.odDatum) {
                sekundeOdDatuma = new Date(
                  capexPravi[0].datumi.odDatum
                ).getTime();
              }
              if (capexPravi[0].datumi && capexPravi[0].datumi.odDatum) {
                sekundeDoDatuma = new Date(
                  capexPravi[0].datumi.doDatum
                ).getTime();
              }

              console.log(sekundeOdDatuma, "sekundeOdDatuma");
              console.log(sekundeDoDatuma, "sekundeDoDatuma");
            }

            if (
              jedan.capexSifra === jedanObjekat.capex.capexSifra &&
              sekundeDatuma > sekundeOdDatuma
            ) {
              console.log(jedanObjekat.potrosnja, "puklooooo");
              return total + jedanObjekat.potrosnja;
            }
            return total;
          }, 0)
        : null,
    preostaliNovac:
      data.length > 0
        ? jedan.odobreniBudzet -
          data.reduce((total, jedanObjekat) => {
            if (jedan.capexSifra === jedanObjekat.capex.capexSifra) {
              console.log(jedanObjekat.potrosnja);
              return total + jedanObjekat.potrosnja;
            }
            return total;
          }, 0) +
          " KM"
        : null
  }));
  console.log(capexiArray, "capexiArray");

  const noviArray = data.map(jedan => ({
    ...jedan,
    potrosnja: `${jedan.potrosnja} KM `,
    capexSifra: jedan.capex.capexSifra,
    budzet: `${jedan.capex.odobreniBudzet} KM`,
    od: moment(jedan.datumPocetkaSedmice).format("DD/MM/YYYY"),
    do: moment(jedan.datumZavrsetkaSedmice).format("DD/MM/YYYY")
  }));
  const filtriranArray = noviArray.filter(
    jedanObjekat => jedanObjekat.poslovnaJedinica === grad
  );
  // da se doda suma svih istih kapexa a ne da se prikazuju
  // picker
  const prebaciGa = e => {
    console.log(e);
    const data = {
      ...e.rowData,
      potrosnja: parseFloat(e.rowData.potrosnja.replace(" KM", ""))
    };
    jedanUnos(data);
    history.push({
      pathname: "/editUnos"
    });
  };
  console.log("ponovvoooos");

  return (
    <>
      <Paper style={{ height: "40vh", width: "100%" }}>
        <WrappedVirtualizedTable
          rowCount={capexiArray.length}
          rowGetter={({ index }) => capexiArray[index]}
          onRowClick={event => console.log(event)}
          columns={[
            {
              width: 120,
              flexGrow: 2.0,
              label: "Capex",
              dataKey: "capexSifra"
            },
            {
              width: 120,
              flexGrow: 1.0,
              label: "Potrosnja",
              dataKey: "potrosnja"
            },

            {
              width: 120,
              flexGrow: 1.0,

              label: "Odobreni Budzet",
              dataKey: "budzet"
            },
            //odvje oduzeti
            {
              width: 120,
              flexGrow: 1.0,

              label: "Preostali novac",
              dataKey: "preostaliNovac"
            }
          ]}
        />
      </Paper>
      <Paper style={{ height: "40vh", width: "100%" }}>
        <WrappedVirtualizedTable
          rowCount={filtriranArray.length}
          rowGetter={({ index }) => filtriranArray[index]}
          onRowClick={event => prebaciGa(event)}
          columns={[
            {
              width: 120,
              flexGrow: 1.0,
              label: "Capex",
              dataKey: "capexSifra"
            },
            {
              width: 120,
              flexGrow: 1.0,
              label: "Potrosnja",
              dataKey: "potrosnja"
            },
            {
              width: 120,
              flexGrow: 1.0,

              label: "Pocetni datum",
              dataKey: "od"
            },
            {
              width: 120,
              flexGrow: 1.0,

              label: "Zavrsni datum",
              dataKey: "do"
            }
          ]}
        />
      </Paper>
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactVirtualizedTable);
