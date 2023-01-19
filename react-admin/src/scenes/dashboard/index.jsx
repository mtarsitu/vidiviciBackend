import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Unauthorized from "../unauthorize/index";
import Button from "@mui/material/Button";
import QueueIcon from "@mui/icons-material/Queue";
import { useState } from "react";
import ToProfesional from "../users/toProfessional";
import LineChart from "../../components/LineChart";
const Dashboard = ({ useratom, authorized }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useratom;
  const modalBackground = theme.palette.mode ? "dark" : "light";
  const [profesionalModal, setProfesionalModal] = useState(false);
  console.log(user);
  const handleOpenModal = () => {
    setProfesionalModal(true);
  };
  return (
    <>
      {user != null ? (
        <Box m="20px">
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          {user.userRole === "Prospect" && (
            <>
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: colors.purpleAccent[700],
                }}
              >
                <QueueIcon /> &nbsp; Devino investitor profesionist
              </Button>

              <ToProfesional
                show={profesionalModal}
                setShow={setProfesionalModal}
                user={useratom}
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
