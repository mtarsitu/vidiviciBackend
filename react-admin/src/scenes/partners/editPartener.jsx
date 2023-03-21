import * as React from "react";
import { Button, Modal, Avatar, Box, TextField, useTheme } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { tokens } from "../../theme";
import { textFieldSx } from "../../data/sx/textFieldsSx";
import { requests } from "../../data/dataAtom";

const EditPartner = ({ oldPartner, setPartenerEdit, mode, show, setShow,refresh }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const Edit = async (user) => {
    const response = await requests.Post(`Partners/editPartner`, user);
    if (response.ok) {
      refresh();
      toast.success("Partener editat cu succes!");
    } else toast.error("Ceva nu a functionat, te rugam sa incerci din nou");
  };
  const handleEditFinish = () => {
    setPartenerEdit({});
    setShow(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("id",oldPartner.id);
    data.append("logo",oldPartner.logo)
    data.append("logoTitle",oldPartner.logoTitle)

    Edit(data);
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
            mode === "light" ? colors.primary[900] : colors.primary[400]
          }`,
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "12px",
          p: 4,
        }}
      >
        <Box m="20px">
          <Header
            title="Modifica profil"
            subtitle="modifica profilul unui utilizator"
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
                Modifica Partner
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
                  id="name"
                  label="Nume"
                  name="name"
                  autoFocus
                  defaultValue={oldPartner.name}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Descriere"
                  type="text"
                  id="description"
                  defaultValue={oldPartner.description}
                  sx={textFieldSx}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
                >
                  Confirma modificarea pentru {oldPartner.firstName} -{" "}
                  {oldPartner.lastName}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditPartner;
