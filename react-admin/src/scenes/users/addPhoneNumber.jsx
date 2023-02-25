import * as React from "react";
import { Button, Modal, Avatar, Box, TextField, useTheme } from "@mui/material";

import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";
import { tokens } from "../../theme";
import MuiPhoneNumber from "material-ui-phone-number";
import { useState } from "react";
import { requests } from "../../data/dataAtom";
import PhoneLockedIcon from '@mui/icons-material/PhoneLocked';
const AddPhoneNumber = ({ show, setShow, setConfirm, mode }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const sendPhoneNumber = async (form) => {
    const response = await requests.Post(`Accounts/enableTwoFactor`, form);
    if (response.ok) {
      setConfirm(true);
      setShow(false);
    } else toast.error("Ceva nu a functionat, te rugam sa incerci din nou");
  };
  
  const handleEditFinish = () => {
    setShow(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);
    sendPhoneNumber(data);
    handleEditFinish();
  };

  return (
    <Modal
      open={show}
      onClose={handleEditFinish}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          bgcolor: `${
            mode === "light" ? colors.primary[900] : colors.primary[400]
          }`,
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "12px",
          p: 4,
        }}
      >
        <Box m="20px">
          <Header title="Numar de telefon" subtitle="Adauga numar" />
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{
                marginTop: -5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <PhoneLockedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Introdu Numarul de telefon
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <MuiPhoneNumber
                  name="phoneNumber"
                  defaultCountry={"ro"}
                  regions="europe"
                  sx={{ marginTop: 10, marginBottom: 10, marginLeft: 15 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
                >
                  Confirma numarul de telefon
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPhoneNumber;
