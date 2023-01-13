import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Unauthorized from "../unauthorize/index";

const Dashboard = ({ useratom }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useratom;
  console.log(user, "dashboard");
  return (
    <>
      {user != null ? (
        <Box m="20px"></Box>
      ) : (
        <Unauthorized errorMessage={"Unauthorized"} />
      )}
    </>
  );
};

export default Dashboard;
