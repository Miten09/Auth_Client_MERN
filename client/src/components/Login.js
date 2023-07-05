import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  }

  async function handleClick() {
    const { email, password } = loginData;
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 401) {
      window.alert("User Does not exist Plzz Signup First");
    } else if (res.status === 402) {
      window.alert("password is incorrect");
    } else if (res.status === 400) {
      window.alert("plzzz fill all fields");
    } else {
      window.alert("Login successfully");
      navigate("/client");
    }
  }
  return (
    <>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "orange",
            backgroundColor: "black",
          }}
        >
          Login
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ backgroundColor: "lightcyan" }}
            required
            id="email"
            name="email"
            label="Your Email"
            type="email"
            value={loginData.email || ""}
            onChange={handleChange}
            autoComplete="current-password"
            InputProps={{
              style: {
                color: "green",
              },
            }}
            InputLabelProps={{
              style: { color: "blue" },
            }}
          />
          <TextField
            sx={{ backgroundColor: "lightcyan" }}
            id="password"
            name="password"
            label="Your Password"
            type="password"
            value={loginData.password || ""}
            onChange={handleChange}
            autoComplete="current-password"
            InputProps={{
              style: {
                color: "green",
              },
            }}
            InputLabelProps={{
              style: { color: "blue" },
            }}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2, mr: 17 }}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Typography variant="h8" sx={{ mt: 2 }}>
            Don't Have an Account? <NavLink to="/register">Sign Up</NavLink>
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default Login;
