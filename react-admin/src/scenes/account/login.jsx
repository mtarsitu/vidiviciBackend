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
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmSms from "./confirmSms";
import { requests } from "../../data/dataAtom";
export default function Login({ useratom }) {
  const loggedUser = useratom;
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [showConfirmSms, setShowConfirmSms] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    singIn(data);
  };
  const singIn = async (user) => {
    let username = user.get("username");
    try {
      let response = await requests.Post(`Accounts/login`, user);
      if (response.ok) {
        toast.success(`${username} Te-ai logat cu succes!`);
        setRefresh(!refresh);
        navigate("/dashboard");
      } else if (response.status === 409) {
        setShowConfirmSms(true);
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
            <Google />
            <Facebook />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required={true}
                // error
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
            <ConfirmSms show={showConfirmSms} setShow={setShowConfirmSms} />
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
