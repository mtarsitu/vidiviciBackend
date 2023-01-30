import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import { ColorModeContext, useMode } from "../../theme";
import TextField from "@mui/material/TextField";
import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import QueueIcon from "@mui/icons-material/Queue";
import { useAtom } from "jotai";
import {
  newInformationAtom,
  RegisterInformationAtom,
} from "../../data/dataAtom";

const AddInformation = ({ show, setShow, userId, mode, colors }) => {
  const [, setNewInformation] = useAtom(newInformationAtom);
  const RegisterInformation = useAtom(RegisterInformationAtom);
 console.log(show);
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const info = {
      userId: userId,
      cnp: data.get("cnp"),
      iban: data.get("iban"),
      phoneNumber: data.get("phoneNumber"),
      address: data.get("address"),
      bank: data.get("bank"),
      cui: data.get("cui"),
      regComertului: data.get("regComertului"),
      birthDate: data.get("birthDate"),
    };
    console.log(info);
    setNewInformation(info);
    setTimeout(() => {
      handleClose();
    }, 300);
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "scroll" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "55%",
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
            title="Detalii personale"
            subtitle="Adauga detalii personale"
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
              Completeaza campurile de mai jos
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
                id="cnp"
                label="CNP"
                name="cnp"
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
                name="iban"
                label="IBAN"
                type="text"
                id="iban"
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
                name="phoneNumber"
                label="Telefon"
                type="text"
                id="phoneNumber"
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
                name="address"
                label="Adresa"
                type="text"
                id="address"
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
                name="bank"
                label="Numele Bancii"
                type="text"
                id="bank"
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
                name="cui"
                label="Cui Firma"
                type="text"
                id="cui"
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
                name="regComertului"
                label="Registrul Comertului"
                type="text"
                id="regComertului"
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
                name="birthDate"
                label="Nascut/a la data de"
                type="text"
                id="birthDate"
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
                Adauga Detalii
              </Button>
              {/* <ToastContainer
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
              /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddInformation;
