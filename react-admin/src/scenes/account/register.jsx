import * as React from "react";
import { Button, useTheme, Avatar, Box } from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";
import { tokens } from "../../theme";
import { requests } from "../../data/dataAtom";
import FormInput from "../../components/FormInput";
import { useEffect } from "react";

const Register = () => {
  const [disabled, setDisabled] = useState(true);
  const [validPassword, setValidPass] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmationPass: "",
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      label: "Username",
      type: "text",
      helperText: "Acest camp poate contine doar litere si cifre",
      regex: /[0-9a-zA-Z]{4,}/,
    },
    {
      id: 2,
      name: "firstName",
      label: "Nume de familie",
      type: "text",
      helperText:
        "Acest camp poate contine doar litere si trebuie sa aiba minim 4 litere!",
      regex: /[a-zA-Z]{4,}/,
    },
    {
      id: 3,
      name: "lastName",
      label: "Prenume",
      type: "text",
      helperText:
        "Acest camp poate contine doar litere si trebuie sa aiba minim 4 litere!",
      regex: /[a-zA-Z]{4,}/,
    },
    {
      id: 4,
      name: "email",
      label: "Email",
      type: "email",
      helperText: "Introdu o adresa de mail valida!",
      regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    {
      id: 5,
      name: "password",
      label: "Parola",
      type: "password",
      helperText:
        "Parola trebuie sa fie formata din minim 8 caractere si sa contina cel putin o litera mare, o cifra si un caracter special",
      regex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    {
      id: 6,
      name: "confirmationPass",
      label: "Confirma Parola",
      type: "password",
      helperText: values["password"] === values["confirmationPass"] && !validPassword
        ? "Parola trebuie sa fie formata din minim 8 caractere si sa contina cel putin o litera mare, o cifra si un caracter special"
        : "Parolele nu sunt la fel",
      regex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  ];

  async function Register(formData) {
    const response = await requests.Post(`Accounts/register`, formData);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Register(data);
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const checkDisabled = () => {
    for (let i = 0; i < inputs.length; i++) {
      if (
        !values[inputs[i].name].match(inputs[i].regex) ||
        !values["password"] === values["confirmationPass"]
      ) {
        if (!disabled) {
          setDisabled(true);
          setValidPass(false);
        }
        return;
      }
    }
    console.log("ajunge");
    setDisabled(false);
    setValidPass(true);
  };
  useEffect(() => {
    checkDisabled();
  }, [values]);

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
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              marginTop: "-80px",
            }}
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
            Inregistreaza utilizator
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}

            <Button
              type="submit"
              disabled={disabled}
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
