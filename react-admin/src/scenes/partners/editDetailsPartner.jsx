import * as React from "react";
import { Button, Modal, Avatar, Box, TextField, useTheme } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";
import { tokens } from "../../theme";
import { textFieldSx } from "../../data/sx/textFieldsSx";
import { requests } from "../../data/dataAtom";

const EditDetails = ({
  oldDetails,
  setDetailToEdit,
  mode,
  show,
  setShow,
  refresh,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const Edit = async (details) => {
    const response = await requests.Post(`PartnerDetails/edit`, details);
    if (response.ok) {
      refresh();
      toast.success("Detalii editate cu succes!");
    } else toast.error("Ceva nu a functionat, te rugam sa incerci din nou");
  };
  const handleEditFinish = () => {
    setDetailToEdit({});
    setShow(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(oldDetails);
    const data = new FormData(event.currentTarget);
    data.append("id", oldDetails.id);
    data.append("partnerId", oldDetails.partnerId);

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
                  id="year"
                  label="An"
                  name="year"
                  autoFocus
                  defaultValue={oldDetails.year}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="profit"
                  label="Profit"
                  type="text"
                  id="description"
                  defaultValue={oldDetails.profit}
                  sx={textFieldSx}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="debths"
                  label="Datorii"
                  type="text"
                  id="debths"
                  defaultValue={oldDetails.debths}
                  sx={textFieldSx}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="earnings"
                  label="Cifra de afaceri"
                  type="text"
                  id="earnings"
                  defaultValue={oldDetails.earnings}
                  sx={textFieldSx}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="ebitda"
                  label="Ebitda"
                  type="text"
                  id="ebitda"
                  defaultValue={oldDetails.ebitda}
                  sx={textFieldSx}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="fixedAssets"
                  label="Active imobilizate"
                  type="text"
                  id="fixedAssets"
                  defaultValue={oldDetails.fixedAssets}
                  sx={textFieldSx}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
                >
                  Confirma modificarea pentru {oldDetails.firstName} -{" "}
                  {oldDetails.lastName}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditDetails;
