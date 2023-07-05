import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { AppBar } from "@mui/material";

const Navigate = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 0 }}>
        <AppBar position="static">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "20px",
              textDecoration: "none",
            }}
          >
            <NavLink
              style={{ color: "orange", textDecoration: "none" }}
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              style={{ color: "orange", textDecoration: "none" }}
              to="/register"
            >
              Sign Up
            </NavLink>
            <NavLink
              style={{ color: "orange", textDecoration: "none" }}
              to="/client"
            >
              Dashboard
            </NavLink>
            <NavLink
              style={{ color: "orange", textDecoration: "none" }}
              to="/logout"
            >
              Logout
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navigate;
