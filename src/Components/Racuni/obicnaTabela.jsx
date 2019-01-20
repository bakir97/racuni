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
import { Button } from "@material-ui/core";
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

function SimpleTable(props) {
  const { classes, data, mjesto } = props;
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
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Poslovna jedinica</TableCell>
            <TableCell align="right">Datum objave</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            return (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.capex.capexSifra}
                </TableCell>
                <TableCell align="right">
                  {moment(row.datumPocetkaSedmice).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {moment(row.datumZavrsetkaSedmice).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="right">
                  {row.potrosnja.toLocaleString("bs", {
                    maximumFractionDigits: 2,
                    minumumFractionDigits: 2
                  })}{" "}
                  KM
                </TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.poslovnaJedinica}</TableCell>
                <TableCell align="right">
                  {moment(row.updatedAt).format("DD/MM/YYYY")}
                </TableCell>

                <TableCell align="right">
                  {(mjesto === row.poslovnaJedinica ||
                    props.user.adminAplikacije) &&
                    !props.user.direktor && (
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "yellow" }}
                        onClick={() => prebaci(row)}
                      >
                        Izmjeni
                      </Button>
                    )}
                </TableCell>
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
const mapStateToProps = state => ({
  user: state.all.user
});

const mapDispatchToProps = { jedanUnos };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SimpleTable));
