import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";

const Register = () => {
  const [pass, setPass] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");
  const [validPassword, setValidPass] = useState(false);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  let user = {
    username: "",
    password: "",
  };
  async function Register(formData) {
    user = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    await fetch(`http://localhost:5241/Accounts/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    window.location = "/";
  }
  const handleChangePass = (e) => {
    console.log(e.target.value);
    setPass(e.target.value);
  };

  const handleConfirmationPass = (e) => {
    setConfirmationPass(e.target.value);
    if (pass == e.target.value) {
      setValidPass(true);
    } else {
      setValidPass(false);
    }
  };

  console.log(pass, confirmationPass);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    Register(data);
  };
  console.log(validPassword);

  return (
    <Box m="20px">
      <Header title="CREEAZA UTILIZATOR" subtitle="Creaza un nou profil" />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inregistreaza utilizator
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parola"
            type="password"
            id="password"
            onChange={handleChangePass}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmationPassword"
            label="Reintrodu Parola"
            type="password"
            id="confirmationPassword"
            onChange={handleConfirmationPass}
            
            sx={{
                "& .MuiFormLabel-root": {
                    color: 'primary.main'
                },
                "& .MuiFormLabel-root.Mui-focused": {
                    color: 'secondary.main'
                }
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
