import { DropzoneArea } from "react-mui-dropzone";
import { Button, Modal, Box, Avatar, Typography } from "@mui/material";
import Header from "../../components/Header";
import QueueIcon from "@mui/icons-material/Queue";
import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../data/dataAtom";
import { requests } from "../../data/dataAtom";
const UploadDocuments = ({
  show,
  setShow,
  mode,
  colors,
  user,
  refresh,
  setRefresh,
  section,
  setSection,
}) => {
  const [files, setFiles] = useState({ identityCard: "", bankStatement: "" });

  const handleClose = () => {
    setShow(false);
  };
  console.log(files.identityCard);
  const addIdentityCard = (file) => {
    //Saving files to state for further use and closing Modal.
    // setShow(false);
    setFiles((prevState) => ({ ...prevState, identityCard: file }));
  };

  const addStatement = (file) => {
    setFiles((prevState) => ({ ...prevState, bankStatement: file }));
  };
  const setForm = () => {
    const formData = new FormData();
    formData.append("clientId", user.id);
    formData.append("idTitle", files.identityCard[0].name);
    formData.append("idImage", files.identityCard[0]);
    formData.append("bankStatementTitle", files.bankStatement[0].name);
    formData.append("bankStatementImage", files.bankStatement[0]);
    upload(formData);
    setShow(false);
  };

  const upload = async (form) => {
    const response = await requests.Post("Applications/addDocuments", form);
    if (response.ok) {
      setRefresh(!refresh);
      if (section) {
        setSection(section + 1);
      }
      toast.success("Documente adaugate cu succes!");
    } else {
      toast.error("Nu au fost adaugate");
    }
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
            title="Documente"
            subtitle="Adauga documentele cerute mai jos"
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
              Documente necesare
            </Typography>
          </Box>
          <Box sx={{ marginTop: 10 }}>
            <Typography
              variant="h3"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ m: "0 0 5px 0" }}
            >
              Incarca buletinul
            </Typography>

            <DropzoneArea
              previewText="Buletin"
              onChange={addIdentityCard.bind(this)}
              filesLimit={1}
              maxWidth={"200px"}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={false}
              maxFileSize={5000000}
              dropzoneText="Apasa sau pune buletinul direct aici "
           
            />
            <Typography
              variant="h3"
              color={colors.grey[100]}
              fontWeight="bold"
              sx={{ m: "0 0 5px 0" }}
            >
              Incarca Extrasul
            </Typography>
            <DropzoneArea
              previewText="Extras"
              onChange={addStatement.bind(this)}
              filesLimit={1}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={false}
              maxFileSize={5000000}
              dropzoneText="Incarca extrasul de banca "
            />
            <Button
              onClick={setForm}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inregistreaza documente
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadDocuments;
