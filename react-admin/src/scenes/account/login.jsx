import * as React from "react";
import Google from "./google";
import {
  Button,
  Avatar,
  useTheme,
  CssBaseline,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { tokens } from "../../theme";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Unauthorize from "../unauthorize";
import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from "react";

import Facebook from "./facebook";
import { refreshAtom, baseUrl } from "../../data/dataAtom";
import { useAtom } from "jotai";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login({ useratom }) {
  const loggedUser = useratom;
  const navigate = useNavigate();
  
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [refresh, setRefresh] = useAtom(refreshAtom);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get("username"),
      password: data.get("password"),
    };
    singIn(user);
  };
  const singIn = async (user) => {
    try {
      let response = await fetch(baseUrl + `Accounts/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        toast.success(`${user.username} Te-ai logat cu succes!`);
        setRefresh(!refresh);

        navigate("/dashboard");
      } else {
        toast.warning("Username sau parola gresita aici");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loggedUser == null ? (
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
              src={`../../../assets/logo-inchis.png`}
              style={{ cursor: "pointer", borderRadius: "50%" }}
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
            <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
              Sign in
            </Typography>
            <Google/>
            <Facebook />
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
                sx={{ mt: 3, mb: 2, backgroundColor: colors.purpleAccent[700] }}
              >
                Sign In
              </Button>
            </Box>
            <Button
              href="/register"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: colors.purpleAccent[700] }}
            >
              Register
            </Button>
          </Box>
        </Container>
      ) : (
        <Box>
          <Unauthorize errorMessage={"deja logat"} />
        </Box>
      )}
    </>
  );
}
