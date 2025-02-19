import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import { ColorModeContext, useMode } from "../../theme";
import TextField from "@mui/material/TextField";
import {
  Box,
  Modal,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import QueueIcon from "@mui/icons-material/Queue";
import { textFieldSx } from "../../data/sx/textFieldsSx";
import { useMode, tokens } from "../../theme";
import { useAtom } from "jotai";
import { refreshFundsAtom, baseUrl } from "../../data/dataAtom";
import { toast } from "react-toastify";
import { requests } from "../../data/dataAtom";
import { useState } from "react";
const AddFund = ({ show, setShow, mode }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [refreshFunds, setRefreshFunds] = useAtom(refreshFundsAtom);
  const [period, setPeriod] = useState();
  const [returningType, setReturningType] = useState();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  // colors.primary[500]

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("period", period);
    data.append("returningType", returningType);
    registerFund(data);
  };

  const handleChangePeriod = (event) => {
    setPeriod(event.target.value);
  };

  const handleChangeReturning = (event) => {
    setReturningType(event.target.value);
  };

  const registerFund = async (fund) => {
    const response = await requests.Post(`Funds/addFund`, fund);
    if (response.ok) {
      toast.success("Fond adaugat cu succes");
      setRefreshFunds(!refreshFunds);
    } else {
      toast.error("Nu a fost adaugat fondul");
    }
  };
  console.log(period, returningType, "asdada");

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
          <Header title="Creaza Fond nou" subtitle="Creaza un nou fond" />
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
              Adauga Fond
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
                label="name"
                name="name"
                autoFocus
                sx={textFieldSx}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="currency"
                label="Moneda"
                name="currency"
                autoFocus
                sx={textFieldSx}
              />
              <FormControl variant="standard" sx={{ m: 1 }} fullWidth required>
                <InputLabel id="demo-simple-select-label">Perioada</InputLabel>
                <Select
                  fullWidth
                  labelId="period"
                  name="period"
                  id="period"
                  onChange={handleChangePeriod}
                >
                  <MenuItem value={1}>1 an</MenuItem>
                  <MenuItem value={2}>2 ani</MenuItem>
                  <MenuItem value={3}>3 ani</MenuItem>
                  <MenuItem value={4}>4 ani</MenuItem>
                  <MenuItem value={5}>5 ani</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="interestRate"
                label="Dobanda"
                type="text"
                id="interestRate"
                sx={textFieldSx}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="private"
                label="Privat"
                type="text"
                id="private"
                sx={textFieldSx}
              />
              <FormControl variant="standard" sx={{ m: 1 }} fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Tip de returnare
                </InputLabel>
                <Select
                  value={returningType}
                  labelId="returningType"
                  required
                  fullWidth
                  name="returningType"
                  id="returningType"
                  label="Tip returnare"
                  onChange={handleChangeReturning}
                  sx={textFieldSx}
                >
                  <MenuItem value={1}>Anual</MenuItem>
                  <MenuItem value={2}>Semestrial</MenuItem>
                  <MenuItem value={3}>Trimestial</MenuItem>
                  <MenuItem value={4}>Lunar</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="details"
                label="Detalii"
                name="details"
                autoFocus
                sx={textFieldSx}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Adauga fond
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddFund;
