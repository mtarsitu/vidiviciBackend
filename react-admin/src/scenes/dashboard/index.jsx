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
  const [profesionalModal, setProfesionalModal] = useState(false);

  const handleOpenModal = () => {
    setProfesionalModal(true);
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

              <ToProfesional
                show={profesionalModal}
                setShow={setProfesionalModal}
              />
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
