import { Box } from "@mui/material";
import Unauthorized from "../unauthorize/index";
import AdminDashboard from "./adminDashboard";
import ProspectDashboard from "./prospectDashboard";
const Dashboard = ({ useratom, authorized, mode, colors }) => {
  const user = useratom;
  
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
            <ProspectDashboard
              colors={colors}
              useratom={user}
              mode={mode}
              user={user}
            />
          )}
        </Box>
      ) : (
        <Unauthorized errorMessage={"Unauthorized"} />
      )}
    </>
  );
};

export default Dashboard;
