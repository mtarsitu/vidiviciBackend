import { Box, useTheme, Modal } from "@mui/material";
import { tokens } from "../../theme";
import Unauthorized from "../unauthorize/index";
import Button from "@mui/material/Button";
import QueueIcon from "@mui/icons-material/Queue";
import { useState } from "react";
import ToProfesional from "../users/toProfessional";
const Dashboard = ({ useratom, authorized }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useratom;
  const modalBackground = theme.palette.mode ? "dark" : "light";
  const [profesionalModal, setProfesionalModa] = useState(false);
  console.log(modalBackground);
  const handleOpenModal = () => {
    setProfesionalModa(true);
  };
  const handleCloseModal = () => {
    setProfesionalModa(false);
  };

  return (
    <>
      {user != null ? (
        <Box m="20px">
          {user.userRole === "Prospect" && (
            <>
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: `neutral.main`,
                }}
              >
                <QueueIcon /> &nbsp; Devino investitor profesionist
              </Button>
              {profesionalModal && (
                <Modal
                  open={handleOpenModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{overflow:"scroll",}}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "90%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "80vw",
                      bgcolor: `neutral.${modalBackground}`,
                      border: "2px solid #000",
                      boxShadow: 24,
                      borderRadius: "12px",
                      p: 4,
                      
                    }}
                  >
                    <ToProfesional />
                  </Box>
                </Modal>
              )}
            </>
          )}
          
        </Box>
      ) : (
        <Unauthorized errorMessage={"Unauthorized"} />
      )}
    </>
  );
};

export default Dashboard;
