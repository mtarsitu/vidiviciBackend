import { Box, Button } from "@mui/material";
import UserApplication from "./userApplication";
import UserDocuments from "./userDocuments";
const VerifyApplication = ({ show,setOpenManage, user, mode, colors }) => {
  const handleBack = () => {
    setOpenManage(!show);
  };
  return (
    <Box>
      <Box m="10px">
        <Button
          onClick={handleBack}
          variant="contained"
          sx={{
            backgroundColor: colors.purpleAccent[700],
            marginRight:5
          }}
        >
          Inapoi
        </Button>
        <Button
          onClick={handleBack}
          variant="contained"
          sx={{
            backgroundColor: colors.purpleAccent[700],
          }}
        >
          Aproba
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <UserApplication
          handleClose={setOpenManage}
          user={user}
          mode={mode}
          colors={colors}
        />
        <UserDocuments />
      </Box>
    </Box>
  );
};
export default VerifyApplication;
