import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";

const RoleRegister = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  let user = {
    username: "",
    password: "",
    userRole:""
  }
  async function Register(formData) {
    user = {
      username: formData.get("username"),
      password: formData.get("password"),
      userRole: formData.get("userRole")
    }
    await fetch(`http://localhost:5241/registerRole`, {
      method: "POST",
      credentials: "include",
      headers:{
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });
    
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    Register(data);
  };

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
          <TextField
            margin="normal"
            required
            fullWidth
            name="userRole"
            label="Rolul utilizatorului"
            type="userRole"
            id="userRole"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoleRegister;
