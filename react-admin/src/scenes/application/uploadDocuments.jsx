import { DropzoneArea } from "react-mui-dropzone";
import { Button, Modal, Box, Avatar, Typography } from "@mui/material";
import Header from "../../components/Header";
import QueueIcon from "@mui/icons-material/Queue";
import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../data/dataAtom";
const UploadDocuments = ({ show, setShow, mode, colors, user }) => {
  const [files, setFiles] = useState({ identityCard: "" });

  const handleClose = () => {
    setShow(false);
  };

  const addIdentityCard = (file) => {
    //Saving files to state for further use and closing Modal.
    // setShow(false);
    setFiles({ identityCard: file });
  };
  const setForm = () => {
    const formData = new FormData();

    formData.append("clientId", user.id);
    formData.append("title", files.identityCard[0].name);
    formData.append("image", files.identityCard[0]);
    upload(formData);
    setShow(false);
  };

  const upload = async (form) => {
    const response = await fetch(
      baseUrl+"Applications/addDocuments",
      {
        method: "POST",
        credentials: "include",
        body: form,
      }
    );
    if (response.ok) {
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
              previewText="Hello"
              onChange={addIdentityCard.bind(this)}
              filesLimit={1}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              showPreviews={true}
              maxFileSize={5000000}
              dropzoneText="Apasa sau pune buletinul direct aici "
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
