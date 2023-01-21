import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import QueueIcon from "@mui/icons-material/Queue";
import ToProfesional from "../users/toProfessional";
import LineChart from "../../components/LineChart";
import Unauthorized from "../unauthorize/index";
import { useState } from "react";
import AdminDashboard from "./adminDashboard";
import StatBox from "../../components/StatBox";
const Dashboard = ({ useratom, authorized, mode, colors }) => {
  const user = useratom;
  const [profesionalModal, setProfesionalModal] = useState(false);

  const handleOpenModal = () => {
    setProfesionalModal(true);
  };

  // const dashboard = () =>{
  //   switch(user.userRole){
  //     case "admin": return(

  //     );
  //   }
  // }

  return (
    <>
      {user != null ? (
        <Box m="20px" sx={{ marginTop: -2 }}>
          {user.userRole === "Admin" && <AdminDashboard user={user} />}
          {user.userRole === "Prospect" && (
            <>
              <Box
                m="30px"
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box onClick={handleOpenModal} sx={{cursor:"pointer"}}>
                <StatBox
                  title={"Investitor Profesional"}
                  subtitle="Aplica pentru a investii"
                  icon={
                    <QueueIcon
                      sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                    />
                  }
                />
                </Box>
                
              </Box>
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                  marginRight: 5,
                  marginTop: 5,
                  backgroundColor: colors.purpleAccent[700],
                }}
              >
                <QueueIcon /> &nbsp; Devino investitor profesionist
              </Button>

              <ToProfesional
                show={profesionalModal}
                setShow={setProfesionalModal}
                user={useratom}
                mode={mode}
                colors={colors}
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
