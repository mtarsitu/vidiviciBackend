import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { isLoggedAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";

export default function SignIn() {
  const [, setIsLogged] = useAtom(isLoggedAtom);
  let user = {
    username: "",
    password: "",
  };
  async function LogInUser(formData) {
    console.log(formData.get("username"));
    user = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    // console.log(user.username , user.password);
    let response = await fetch(`http://localhost:5241/Accounts/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      setIsLogged(true);
    }
    return response.ok;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    LogInUser(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="-80px"
      >
        <img
          alt="profile-user"
          width="150%"
          height="150%"
          src={`../../../assets/vidivici-logo.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
      </Box>
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            // autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor:`neutral.main` }}
          >
            Sign In
          </Button>
        </Box>
        <Button
          href="/register"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor:`neutral.main`  }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}
