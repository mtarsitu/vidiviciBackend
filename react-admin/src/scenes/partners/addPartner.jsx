import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { DropzoneArea } from "react-mui-dropzone";
// import { ColorModeContext, useMode } from "../../theme";
import TextField from "@mui/material/TextField";
import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import QueueIcon from "@mui/icons-material/Queue";
import { useMode, tokens } from "../../theme";
import { baseUrl } from "../../data/dataAtom";
import { toast } from "react-toastify";
import { useState } from "react";
import { requests } from "../../data/dataAtom";
import { textFieldSx } from "../../data/sx/textFieldsSx";
const AddPartner = ({ show, setShow, mode, setRefresh, refresh }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [files, setFiles] = useState({ identityCard: "" });

  const handleClose = () => {
    setShow(false);
  };

  const addLogo = (file) => {
    //Saving files to state for further use and closing Modal.
    // setShow(false);
    setFiles({ identityCard: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("logoTitle", files.identityCard[0].name);
    formData.append("logo", files.identityCard[0]);

    setShow(false);
    registerPartner(formData);
  };

  const registerPartner = async (form) => {
    const response = await requests.Post(`Partners/addPartner`, form);

    if (response.ok) {
      toast.success("Partener adaugat cu succes");
      setRefresh(!refresh);
    } else {
      toast.error(
        "Nu a fost adaugat partenerul! Te rugam sa incerci mai tarziu"
      );
    }
  };

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
          <Header
            title="Creeaza un nou Partner"
            subtitle="Companii in care investim"
          />
          <Box
            sx={{
              marginTop: -10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <QueueIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Adauga Partner
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
                sx={textFieldSx}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                id="companyName"
                label="Denumire Srl"
                name="companyName"
                autoFocus
                sx={textFieldSx}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Descriere"
                type="text"
                id="description"
                sx={textFieldSx}
              />
              <DropzoneArea
                previewText="Logo"
                onChange={addLogo.bind(this)}
                filesLimit={1}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                maxFileSize={5000000}
                dropzoneText="Adauga logo"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Adauga Partner
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPartner;
