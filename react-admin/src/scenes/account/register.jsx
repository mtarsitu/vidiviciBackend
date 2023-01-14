import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState,useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast, ToastContainer } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const Register = () => {
  const clientId =
    "968260556925-a1kdrj4op5s1j2981l3lent1kg397j83.apps.googleusercontent.com";
  const [pass, setPass] = useState("");
  const [confirmationPass, setConfirmationPass] = useState("");
  const [validPassword, setValidPass] = useState(false);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  let user = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  };
  async function Register(formData) {
    user = {
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    };
    const response = await fetch(`http://localhost:5241/Accounts/register`, {
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

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onSuccess = (res) => {
    console.log("success:", res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
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
          <GoogleLogin
              clientId={clientId}
              buttonText="Inregistreaza-te cu Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
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
              sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
            >
              Register
            </Button>
            
            <Button
              href="/"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
            >
              Deja inregistrat? Click pentru logare!
            </Button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
