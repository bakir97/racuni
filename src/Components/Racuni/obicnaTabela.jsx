import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { connect } from "react-redux";
import { jedanUnos } from "../../Redux/actions/UnosiActions";
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

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

function SimpleTable(props) {
  const { classes, data } = props;
  const prebaci = data => {
    props.jedanUnos(data);
    props.history.push("/EditUnos");
  };
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>CAPEX</TableCell>
            <TableCell align="right">Od</TableCell>
            <TableCell align="right">Do</TableCell>
            <TableCell align="right">Potrosnja</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            return (
              <TableRow key={row._id} onClick={() => prebaci(row)}>
                <TableCell component="th" scope="row">
                  {row.capex.capexSifra}
                </TableCell>
                <TableCell align="right">
                  {moment(row.datumPocetkaSedmice).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(row.datumZavrsetkaSedmice).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">{row.potrosnja} KM</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

const mapDispatchToProps = { jedanUnos };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimpleTable));
