import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData({ ...registerData, [name]: value });
  }

  async function handleClick() {
    const { name, email, password } = registerData;

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400) {
      window.alert("plzz fill all fields");
    } else if (res.status === 402) {
      window.alert("Email is already registered");
    } else {
      window.alert("Data registered successfully");
      navigate("/login");
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
          Sign UP
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
            id="name"
            name="name"
            label="Your Name"
            value={registerData.name || ""}
            onChange={handleChange}
            type="name"
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
            id="email"
            name="email"
            label="Your Email"
            value={registerData.email || ""}
            type="email"
            onChange={handleChange}
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
            onChange={handleChange}
            value={registerData.password || ""}
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
            Sign UP
          </Button>
          <Typography variant="h8" sx={{ mt: 2 }}>
            Already Have an Account? <NavLink to="/login">Login</NavLink>
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default Register;
