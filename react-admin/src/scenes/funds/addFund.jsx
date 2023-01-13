import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ColorModeContext, useMode } from "../../theme";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import QueueIcon from '@mui/icons-material/Queue';
const AddFund = () => {
  const [theme, colorMode] = useMode();
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  let fond = {
    name: "",
    interestRate:"",
    private:"",
    returningType:"",
    
  };
  async function Register(formData) {
    fond = {
      name: formData.get("name"),
      interestRate: parseFloat(formData.get("interestRate")),
      private: Boolean(formData.get("private")),
      returningType: formData.get("returningType"),
      
    };
    console.log(fond,"incercat");
    const response = await fetch(`http://localhost:5241/Funds/addFund`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fond),
    });
    if(response.ok){
      toast.success("Fond adaugat cu succes")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Register(data);
  };

  return (
    <Box m="20px" >
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
  );
};

export default AddFund;
