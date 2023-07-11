import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = useParams();
  console.log(token);

  const resetPassPost = async () => {
    console.log(token.token);
    const res = await fetch(`/api/reset-password-post/${token.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status !== 200) {
      window.alert("Link has been expired");
      navigate("/login");
    } else {
      window.alert("Password Reset successfully");
      navigate("/login");
    }
  };

  const getRestpass = async () => {
    const res = await fetch(`/api/forget-password/${token.token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(res);
    if (res.status === 200) {
      console.log("valid user");
    } else {
      navigate("*");
    }
  };

  useEffect(() => {
    getRestpass();
  }, []);

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
          Reset Password
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
            id="password"
            name="password"
            label="Your New Password"
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
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
            sx={{ mr: 8, mt: 1 }}
            onClick={resetPassPost}
          >
            Reset Password
          </Button>
        </div>
      </Box>
    </>
  );
};

export default ResetPassword;
