import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import { ColorModeContext, useMode } from "../../theme";
import TextField from "@mui/material/TextField";
import {Box,Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import QueueIcon from "@mui/icons-material/Queue";

import { useMode, tokens } from "../../theme";
import { useAtom } from "jotai";
import { RegisterFundAtom,newFondAtom,refreshFundsAtom } from "../../data/dataAtom";
const AddFund = ({show,setShow,mode}) => {
  const [,setNewFond] = useAtom(newFondAtom);
  const [RegisterFund, ] = useAtom(RegisterFundAtom);
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [refreshFunds,setRefreshFunds] = useAtom(refreshFundsAtom);

  console.log(mode);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  // colors.primary[500]
  let fond = {
    name: "",
    interestRate: "",
    private: "",
    returningType: "",
  };
 
  const handleClose= ()=>{
    setShow(false);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fond = {
      name: data.get("name"),
      interestRate: parseFloat(data.get("interestRate")),
      private: Boolean(data.get("private")),
      returningType: data.get("returningType"),
    };
    setNewFond(fond);
    RegisterFund();
    setRefreshFunds(!refreshFunds);
    handleClose();
  
  };
  console.log(refreshFunds);
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
          bgcolor: `${mode==="light"? colors.primary[900]:colors.primary[600]}`,
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
                name="interestRate"
                label="Dobanda"
                type="text"
                id="interestRate"
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
                name="private"
                label="Privat"
                type="text"
                id="private"
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
                name="returningType"
                label="Perioada returnare"
                type="text"
                id="returningType"
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Adauga fond
              </Button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddFund;
