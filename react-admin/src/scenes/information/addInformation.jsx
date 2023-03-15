import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import { ColorModeContext, useMode } from "../../theme";
import TextField from "@mui/material/TextField";
import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import QueueIcon from "@mui/icons-material/Queue";
import { toast } from "react-toastify";
import { requests } from "../../data/dataAtom";
import { textFieldSx } from "../../data/sx/textFieldsSx";
import FormInput from "../../components/FormInput";
import { useState, useEffect } from "react";

const AddInformation = ({
  show,
  setShow,
  userId,
  mode,
  colors,
  refresh,
  setRefresh,
  setSection,
  section,
}) => {
  const [disabled, setDisabled] = useState(true);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [values, setValues] = useState({
    cnp: "",
    address: "",
    iban: "",
    cui: "",
    bank: "",
  });
  const inputs = [
    {
      id: 1,
      name: "cnp",
      label: "CNP",
      type: "text",
      helperText: "Te rugam introdu un CNP valid!",
      regex:
        /\b[1-9][0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])(?:0[1-9]|[1-3][0-9]|4[0-6]|51|52)[0-9]{4}\b/,
    },
    {
      id: 2,
      name: "address",
      label: "Adresa completa",
      type: "text",
      helperText: "Te rugam sa introduci o adresa valida, Oras, Strada, Numar",
      regex: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    },
    {
      id: 3,
      name: "iban",
      label: "Cont Bancar",
      type: "text",
      helperText:
        "Te rugam sa introduci un cont bancar valid cu litere mari ex: RO86RZBR4599833751594364!",
      regex: /^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$/,
    },
    {
      id: 4,
      name: "cui",
      label: "Cod unic de inregistrare al firmei CUI",
      type: "text",
      helperText: "Te rugam sa introduci un cui valid!",
      regex: /[0-9a-zA-Z]{4,}/,
    },
    {
      id: 5,
      name: "bank",
      label: "Numele Bancii",
      type: "text",
      helperText: "Te rugam sa introduci un nume valid!",
      regex: /[a-zA-Z]{6,}/,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setShow(false);
    console.log(show);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    data.append("userId", userId);
    registerInfo(data);
    if(section){setSection(section+1)};
    handleClose();
  };

  const registerInfo = async (info) => {
    const response = await requests.Post("Informations/addInformation", info);
    console.log(response);
    if (response.ok) {
      toast.success("Informatie adaugata cu succes");
      setRefresh(!refresh);
    } else {
      toast.error("Informatia nu a fost adaugata");
    }
  };
  const checkDisabled = () => {
    for (let i = 0; i < inputs.length; i++) {
      if (!values[inputs[i].name].match(inputs[i].regex)) {
        if (!disabled) {
          setDisabled(true);
        }
        return;
      }
    }
    setDisabled(false);
  };

  useEffect(() => {
    checkDisabled();
  }, [values]);

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
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disabled}
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

export default AddInformation;
