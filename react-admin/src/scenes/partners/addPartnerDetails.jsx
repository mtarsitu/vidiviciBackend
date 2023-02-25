import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import QueueIcon from "@mui/icons-material/Queue";
import { useMode, tokens } from "../../theme";
import { baseUrl } from "../../data/dataAtom";
import { toast } from "react-toastify";
import { requests } from "../../data/dataAtom";
import { textFieldSx } from "../../data/sx/textFieldsSx";
const AddPartnerDetails = ({
  id,
  show,
  setShow,
  mode,
  setRefresh,
  refresh,
}) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("partnerId", id);
    setShow(false);
    registerPartnerDetails(formData);
  };

  const registerPartnerDetails = async (form) => {
    const response = await requests.Post(`PartnerDetails/addDetails`, form);
    if (response.ok) {
      toast.success("Informatii adaugate cu succes");
      setRefresh(!refresh);
    } else {
      toast.error(
        "Nu au fost adaugate informatiile! Te rugam sa incerci mai tarziu"
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
            title="Detalii noi"
            subtitle="Detalii financiare ale companiilor"
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
              Adauga informatii partner
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
                sx={textFieldSx}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="profit"
                label="Profit"
                type="text"
                id="description"
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
                sx={textFieldSx}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Adauga Detalii
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPartnerDetails;
