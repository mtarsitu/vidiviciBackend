import * as React from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useMode, tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { refreshAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
import { requests } from "../../data/dataAtom";
import FormInput from "../../components/FormInput";
import { useState } from "react";
import { textFieldSx } from "../../data/sx/textFieldsSx";
import { useEffect } from "react";
const RoleRegister = ({ show, setShow, mode }) => {
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [disabled, setDisabled] = useState(true);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    userRole: "",
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
      name: "password",
      label: "Parola",
      type: "password",
      helperText:
        "Parola trebuie sa fie formata din minim 8 caractere si sa contina cel putin o litera mare, o cifra si un caracter special",
      regex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    {
      id: 3,
      name: "email",
      label: "Email",
      type: "email",
      helperText: "Introdu o adresa de mail valida!",
      regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    {
      id: 4,
      name: "firstName",
      label: "Nume de familie",
      type: "text",
      helperText: "Acest camp poate contine doar litere si trebuie sa aiba minim 4 litere!",
      regex: /[a-zA-Z]{4,}/,
    },
    {
      id: 5,
      name: "lastName",
      label: "Prenume",
      type: "text",
      helperText: "Acest camp poate contine doar litere si trebuie sa aiba minim 4 litere!",
      regex: /[a-zA-Z]{4,}/,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const Register = async (formData) => {
    console.log(Object.fromEntries(formData.entries()));
    const response = await requests.Post(`Accounts/registerRole`, formData);
    if (response.ok) {
      setRefresh(!refresh);
      setShow(false);
      toast.success("User inregistrat");
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Register(data);
  };

  const checkDisabled = ()=>{
    for(let i=0;i<inputs.length;i++){
      if(!values[inputs[i].name].match(inputs[i].regex))
      {
        if(!disabled){setDisabled(true);}
        return;
      };
    }
    setDisabled(false);
  };
  useEffect(()=>{
    checkDisabled();
  },[values])

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          bgcolor: `${
            mode === "light" ? colors.primary[900] : colors.primary[600]
          }`,
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "12px",
          p: 4,
        }}
      >
        <Box m="20px">
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
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
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
              <FormControl fullWidth sx={textFieldSx}>
                <InputLabel id="userRole" name="userRole">
                  Rolul utilizatorului
                </InputLabel>
                <Select
                  labelId="userRole"
                  id="demo-simple-select"
                  name="userRole"
                  value={values.userRole}
                  label="Rolul utilizatorului"
                  onChange={onChange}
                >
                  <MenuItem value={"prospect"}>Prospect</MenuItem>
                  <MenuItem value={"investor"}>Investitor</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disabled}
              >
                Inregistreaza user nou
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RoleRegister;
