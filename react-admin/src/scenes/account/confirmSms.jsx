import * as React from "react";
import { Button, Modal, Avatar, Box, TextField, useTheme } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";
import { baseUrl, refreshAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
const ConfirmSms = ({ show, setShow }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const navigate = useNavigate();
  const ConfirmCode = async (form) => {
    const response = await fetch(baseUrl + `Accounts/twoFactor`, {
      method: "POST",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      setRefresh(!refresh);
      toast.success("Codul a fost validat cu succes!");
      navigate("/dashboard");
    } else toast.error("Ceva nu a functionat, te rugam sa incerci din nou");
  };
  const handleEditFinish = () => {
    setShow(false);
  };
  const handleSubmit = (event) => {
    console.log("ajunge");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    ConfirmCode(data);
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
          width: "80vw",
          bgcolor: `${
            colors === "light" ? colors.primary[900] : colors.primary[400]
          }`,
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "12px",
          p: 4,
        }}
      >
        <Box m="20px">
          <Header
            title="Numar de telefon"
            subtitle="Valideaza numarul de telefon"
          />
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{
                marginTop: -15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AutoFixHighIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Introdu codul primit prin sms
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
                  id="smsPin"
                  label="Codul sms"
                  name="smsPin"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
                >
                  Valideaza cod
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmSms;
