import * as React from "react";
import {Button,Modal,Avatar,Box,TextField,useTheme} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";
import { refreshAtom } from "../../data/dataAtom";
import { useState } from "react";
import { tokens } from "../../theme";
const EditUser = ({ oldUser, setUserEdit,mode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [, setRefresh] = useState(refreshAtom);
  const Edit = async (user) => {
    const response = await fetch(`http://localhost:5241/Accounts/edit`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      setRefresh(true);
      toast.success("User editat cu succes!");
    } else toast.error("Ceva nu a functionat, te rugam sa incerci din nou");
  };
  const handleEditFinish = () => setUserEdit({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      id: oldUser.id,
      username: data.get("username"),
      email: data.get("email"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      userRole: data.get("userRole"),
    };
    Edit(user);
  };

  return (
    <Modal
      open={oldUser.username !== undefined}
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
                Modifica utilizator
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
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  defaultValue={oldUser.username}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="firstName"
                  label="Prenume"
                  type="text"
                  id="firstName"
                  defaultValue={oldUser.firstName}
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
                  defaultValue={oldUser.lastName}
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
                  defaultValue={oldUser.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="userRole"
                  label="Rolul utilizatorului"
                  type="string"
                  id="userRola"
                  defaultValue={oldUser.userRole}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
                >
                  Confirma modificarea pentru {oldUser.firstName} -{" "}
                  {oldUser.lastName}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUser;
