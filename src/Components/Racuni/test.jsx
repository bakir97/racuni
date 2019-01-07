import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";
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

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
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

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function ReactVirtualizedTable({ data, grad, history, jedanUnos }) {
  console.log(data);
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
  return (
    <>
      <Paper style={{ height: "40vh", width: "100%" }}>
        <WrappedVirtualizedTable
          rowCount={filtriranArray.length}
          rowGetter={({ index }) => filtriranArray[index]}
          onRowClick={event => console.log(event)}
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

              label: "Odobreni Budzet",
              dataKey: "budzet"
            },
            //odvje oduzeti
            {
              width: 120,
              flexGrow: 1.0,

              label: "Preostali novac",
              dataKey: "budzet"
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

export default ReactVirtualizedTable;
