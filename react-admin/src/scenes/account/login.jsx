import * as React from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import styles from "./styles.module.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
export default function Login({ useratom }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const clientId =
    "968260556925-a1kdrj4op5s1j2981l3lent1kg397j83.apps.googleusercontent.com";
  const loggedUser = useratom;
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
      toast.success(`${user.username} Te-ai logat cu succes!`);
      const timeout = () => {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      };
      timeout();
      return response.ok;
    } else {
      toast.warning("Username sau parola gresita");
    }
  }
  const ExternalLogin = async (user) => {
    console.log(user);
    let response = await fetch(`http://localhost:5241/Accounts/external`, {
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
      const timeout = () => {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      };
      timeout();
      return response.ok;
    } else {
      toast.warning("Username sau parola gresita");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    LogInUser(data);
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
    console.log(res);
    const externalUser = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
    };
    ExternalLogin(externalUser);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  const responseFacebook = (response) => {
    console.log(response);
    if(response){
        const fullName = response.name.split(" ");
        const externalUser = {
          firstName: fullName[0],
          lastName: fullName[1],
          email: fullName[0]+"."+fullName[1]+"@testfacebook.com",
        };
        console.log(externalUser);
        ExternalLogin(externalUser);
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
            <GoogleLogin
              clientId={clientId}
              buttonText="Continua cu Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={true}
            />
            <FacebookLogin
              appId="2097613670424852"
              // autoLoad={true}
              textButton="Continua cu Facebook"
              // fields="name,email,picture"
              // onClick={componentClicked}
              cssClass={`${styles.facebook}`}
              callback={responseFacebook}
              icon={<FacebookIcon/>}
              height="5"
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
