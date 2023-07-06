import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Modal from "./Modal";

const ClientDashboard = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [state, setstate] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const res = await fetch("/api/showclient", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        setstate(data.data);
      }
    } catch (error) {
      navigate("/login");
    }
  }

  async function deleteData(val) {
    console.log(val);
    const res = await fetch(`/api/deleteclient/${val}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data) {
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, [state]);

  return (
    <>
      <Modal />
      <TableContainer sx={{ marginTop: "50px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ pl: 8 }}>Name</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact Info</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((val, index) => (
              <StyledTableRow key={val.name}>
                <StyledTableCell component="th" scope="row" sx={{ pl: 6 }}>
                  {val.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {index + 1 == 0 ? "" : `${val.role}`}
                </StyledTableCell>
                <StyledTableCell align="center">{val.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {index + 1 == 0 ? "" : `${val.phone},${val.city}`}
                </StyledTableCell>
                <Button sx={{ p: 0.5 }} color="secondary" variant="contained">
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button
                  sx={{ p: 0.5 }}
                  variant="contained"
                  color="error"
                  onClick={() => deleteData(val._id)}
                >
                  Delete
                </Button>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ClientDashboard;
