import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

export default function Modal({ show, close, open, data }) {
  const [role, setRole] = useState("");
  const [clientData, setClientData] = useState({
    name: "",
    role: [],
    email: "",
    contact: [
      {
        city: "",
        phone: "",
      },
    ],
  });

  // const [phone, setPhone] = useState([]);
  // const [city, setCity] = useState([]);

  const handleClickOpen = () => {
    open();
  };

  const handleDropdownChange = (event) => {
    setRole(event.target.value);
  };

  function handleOpenContactInfo() {
    // setPhone([...phone, ""]);
    // setCity([...city, ""]);
    setClientData.contact([...clientData.contact, ""]);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setClientData({ ...clientData, [name]: value });
  }

  async function handleSubmit() {
    const { name, role, email, contact } = clientData;

    const res = await fetch("/api/addclient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        role,
        email,
        contact,
      }),
    });
    const data = await res.json();
    if (res.status === 401) {
      window.alert("Plzz fill all fields");
    } else if (res.status === 403) {
      window.alert("This email is already exists try another one");
    } else {
      window.alert("Data Added successfully");
      close();
    }
  }

  function handleContactChange(e, index) {
    let text = e.target.value;
    let dummy = clientData.contact;

    dummy[index] = text;
    setClientData.contact(() => [...dummy]);
  }

  // function handlephoneChange(e, index) {
  //   let text = e.target.value;
  //   let dummy = phone;

  //   dummy[index] = text;
  //   setPhone(() => [...dummy]);
  // }

  // function handleCityChange(e, index) {
  //   let text = e.target.value;
  //   let dummy = city;

  //   dummy[index] = text;
  //   setCity(() => [...dummy]);
  // }

  // function handleDelete(index) {
  //   setCity((olditems) => {
  //     return city.filter((val, i) => {
  //       return index !== i;
  //     });
  //   });
  //   setPhone((olditems) => {
  //     return phone.filter((val, i) => {
  //       return index !== i;
  //     });
  //   });
  // }

  function handleDelete(index) {
    setClientData.contact((olditems) => {
      return clientData.contact.filter((val, i) => {
        return index !== i;
      });
    });
  }

  useEffect(() => {
    handleOpenContactInfo();
    if (data.length > 0) {
      setClientData(data);
    }
  }, []);

  console.log(data);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 3 }}>
        Add Client
      </Button>
      <Dialog open={show} onClose={close}>
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent sx={{ width: { sm: 500 } }}>
          <TextField
            autoFocus
            sx={{ p: 1 }}
            margin="dense"
            id="name"
            name="name"
            value={clientData.name || ""}
            onChange={handleChange}
            label="Your Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Your Role</InputLabel>
            <Select
              multiple
              labelId="demo-simple-select-label"
              id="role"
              name="role"
              value={clientData.role || ""}
              onChange={handleChange}
              label="Your Role"
              sx={{ width: { sm: 400 }, p: 1 }}
              onChange1={handleDropdownChange}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
              <MenuItem value={"User"}>User</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            sx={{ p: 1 }}
            margin="dense"
            id="email"
            name="email"
            value={clientData.email || ""}
            onChange={handleChange}
            label="Your Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <h3>Contact Info:</h3>
          <div style={{ display: "flex" }}>
            <div>
              {phone.map((value, index) => {
                return (
                  <div key={index}>
                    <TextField
                      autoFocus
                      sx={{ p: 1 }}
                      margin="dense"
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      type="Number"
                      value={value}
                      onChange={(e) => handlephoneChange(e, index, value)}
                      fullWidth
                      variant="standard"
                    />
                  </div>
                );
              })}
            </div>
            &nbsp;&nbsp; &nbsp;&nbsp;
            <div>
              {city.map((value, index) => {
                return (
                  <div style={{ display: "flex" }}>
                    <div key={index}>
                      <TextField
                        autoFocus
                        sx={{ p: 1 }}
                        margin="dense"
                        id="city"
                        name="city"
                        label="Your City"
                        type="text"
                        value={value || ""}
                        onChange={(e) => handleCityChange(e, index, value)}
                        fullWidth
                        variant="standard"
                      />
                    </div>
                    <div
                      style={{
                        marginTop: "30px",
                        marginLeft: "25px",
                        display: "flex",
                      }}
                    >
                      <div>
                        <IconButton aria-label="delete">
                          <AddBoxRoundedIcon onClick={handleOpenContactInfo} />
                        </IconButton>
                      </div>
                      &nbsp;
                      <div>
                        <IconButton aria-label="delete">
                          <DeleteIcon
                            fontSize="big"
                            color="secondary"
                            onClick={() => handleDelete(index)}
                          />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Add Client</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
