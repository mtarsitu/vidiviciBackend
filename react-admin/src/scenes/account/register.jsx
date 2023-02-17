import * as React from "react";
import {Button,useTheme,Avatar,TextField,Box} from "@mui/material";
import { useState,useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";

import { gapi } from "gapi-script";
import { tokens } from "../../theme";

const Register = () => {

  const [pass, setPass] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");
  const [validPassword, setValidPass] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
 
  async function Register(formData) {
    const user = {
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      usedPlatform: "vidivici",
    };
    console.log(user);
    const response = await fetch(`https://vidivici.azurewebsites.net/Accounts/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      toast.success("Te-ai inregistrat cu succes!");
      const timeout = () => {
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      };
      timeout();
    }
  }
  const handleChangePass = (e) => {
    console.log(e.target.value);
    setPass(e.target.value);
  };

  const handleConfirmationPass = (e) => {
    setConfirmationPass(e.target.value);
    if (pass === e.target.value) {
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
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="-140px"
        >
          <img
            alt="profile-user"
            width="150%"
            height="150%"
            src={`../../../assets/vidivici-logo.png`}
            style={{ cursor: "pointer", borderRadius: "50%",marginTop:"-80px" }}
          />
        </Box>
          
        <Box
          sx={{
            marginTop: -15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{marginBottom: 4}}>
            Inregistreaza utilizator
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              sx={{
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "neutral.main",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: `neutral.main`,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `neutral.main`,
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              label="Prenume"
              type="text"
              id="firstName"
              sx={{
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "neutral.main",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: `neutral.main`,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `neutral.main`,
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Nume de familie"
              type="text"
              id="lastName"
              sx={{
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "neutral.main",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: `neutral.main`,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `neutral.main`,
                  },
                },
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

              // sx={{
              //     "& .MuiFormLabel-root": {
              //         color: 'primary.main'
              //     },
              //     "& .MuiFormLabel-root.Mui-focused": {
              //         color: 'secondary.main'
              //     }
              // }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: colors.purpleAccent[700] }}
            >
              Register
            </Button>
            
            <Button
              href="/"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: colors.purpleAccent[700] }}
            >
              Deja inregistrat? Click pentru logare!
            </Button>
            
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
