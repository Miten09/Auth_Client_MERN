import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
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
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState([]);
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

  async function handleEdit(val) {
    setOpenModal(true);
    const res = await fetch(`/api/editclient/${val}`, {
      method: "GET",
      headerd: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setEditData(data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Modal
        data={editData}
        show={openModal}
        close={() => setOpenModal(false)}
        open={() => setOpenModal(true)}
      />
      <TableContainer sx={{ marginTop: "50px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact Info</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((val, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {val.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {index + 1 == 0 ? "" : `${val.role}`}
                </StyledTableCell>
                <StyledTableCell align="center">{val.email}</StyledTableCell>
                <StyledTableCell align="center" sx={{ textAlign: "center" }}>
                  <div>
                    {val?.contact?.map((val, index) => {
                      return (
                        <div key={index}>
                          <div>
                            <span>{val.city}</span> &nbsp;&nbsp; &nbsp;&nbsp;
                            <span>{val.phone}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </StyledTableCell>
                <Box textAlign="center" sx={{ mt: 1 }}>
                  <Button
                    sx={{ p: 0.5 }}
                    color="secondary"
                    variant="contained"
                    onClick={() => handleEdit(val._id)}
                  >
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
                </Box>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ClientDashboard;
