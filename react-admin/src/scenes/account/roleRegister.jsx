import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ColorModeContext, useMode } from "../../theme";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";

const RoleRegister = () => {
  const [theme, colorMode] = useMode();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  let user = {
    username: "",
    password: "",
    email:"",
    firstName:"",
    lastName:"",
    userRole: "",
  };
  async function Register(formData) {
    user = {
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      userRole: formData.get("userRole"),
    };
    const response = await fetch(`http://localhost:5241/Accounts/registerRole`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if(response.ok){
      toast.success("User inregistrat")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Register(data);
  };

  return (
    <Box m="20px" >
      <Header title="CREEAZA UTILIZATOR" subtitle="Creaza un nou profil" />
      <Box
        sx={{
          marginTop: -10,
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
            name="password"
            label="Parola"
            type="password"
            id="password"
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
            name="userRole"
            label="Rolul utilizatorului"
            type="text"
            id="userRole"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Inregistreaza user nou
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
    </Box>
  );
};

export default RoleRegister;
