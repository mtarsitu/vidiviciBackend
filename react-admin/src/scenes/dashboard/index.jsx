import { Box, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import QueueIcon from "@mui/icons-material/Queue";
import ToProfesional from "../users/toProfessional";
import LineChart from "../../components/LineChart";
import Unauthorized from "../unauthorize/index";
import { useState } from "react";
import AdminDashboard from "./adminDashboard";
const Dashboard = ({ useratom, authorized }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useratom;
  const modalBackground = theme.palette.mode ? "dark" : "light";
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
        <Box m="20px" sx={{marginTop:-2}}>
         
          {user.userRole === "Admin" && <AdminDashboard user={user}/> }
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
