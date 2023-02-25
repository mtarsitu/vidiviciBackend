import {  useMode, tokens } from "../../theme";
import {
  Button,
  Modal,
  Box,
  Typography,
  Avatar,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { baseUrl } from "../../data/dataAtom";
import { textFieldSx } from "../../data/sx/textFieldsSx";
const NewInvestment = ({ show, setShow, fund, useratom, mode }) => {
  const [theme,] = useMode();
  const colors = tokens(theme.palette.mode);

  const Register = async (form) => {
    const response = await fetch(baseUrl+"Investments/add", {
      method: "POST",
      credentials: "include",
      body: form,
    });
    if (response.ok) {

      setShow(false);
      toast.success("Investitie inregistrata pentru aprobare");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("clientId", useratom.id);
    data.append("initialInvestmentAmount", event.currentTarget[0].value);
    data.append("fundId", fund);


    Register(data);
  };
  const handleClose = () => {
    setShow(false);
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
              Cerere investitie noua
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
                name="initialInvestmentAmout"
                label="Suma pe care vrei sa o investesti"
                type="text"
                id="initialInvestmentAmout"
                sx={textFieldSx}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Inregistreaza cerere
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewInvestment;
