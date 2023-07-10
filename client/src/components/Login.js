import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

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

  async function handleForgetClick() {
    try {
      const { email } = loginData;
      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 402) {
        window.alert("This email does not exists");
      } else if (res.status === 403) {
        window.alert("Plzz Enter Your email ");
      } else {
        window.alert("Please check your inbox of mail and reset your password");
        setLoginData({ email: "" });
      }
    } catch (error) {
      console.log(error);
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
          <div style={{ display: "flex" }}>
            <div>
              <Button variant="contained" color="success" onClick={handleClick}>
                Sign In
              </Button>
            </div>
            <div>
              <Link
                component="button"
                variant="body2"
                sx={{ ml: 3, mt: 1 }}
                onClick={handleForgetClick}
              >
                Forgot Password ?
              </Link>
            </div>
          </div>
          <Typography variant="h8" sx={{ mt: 3 }}>
            Don't Have an Account? <NavLink to="/register">Sign Up</NavLink>
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default Login;
