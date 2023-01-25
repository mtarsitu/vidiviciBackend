import { Box, Button } from "@mui/material";
import UserApplication from "./userApplication";
import UserDocuments from "./userDocuments";
import { acceptPendingIdAtom,refreshAtom,AcceptPendingAtom,entityInformationAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
import { useState } from "react";
const VerifyApplication = ({ show,setOpenManage, user, mode, colors,id }) => {
  const [, setAcceptPendingId] = useAtom(acceptPendingIdAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const entityInformation = useAtom(entityInformationAtom)[0];
  console.log(entityInformation);
  const userId = useState(id);
  const AcceptPending = useAtom(AcceptPendingAtom);
  const handleBack = () => {
    setOpenManage(!show);
  };
  const handleAccept = () => {
    console.log(userId[0]);
    setAcceptPendingId(userId[0]);
    const timeout = setTimeout(() => {
      setRefresh(!refresh);
    }, 300);
    handleBack();
    
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
          onClick={handleAccept}
          variant="contained"
          sx={{
            backgroundColor: colors.purpleAccent[700],
          }}
        >
          Aproba
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-evenly">
        <UserApplication
          handleClose={setOpenManage}
          user={user}
          mode={mode}
          colors={colors}
        />
        <UserDocuments  colors={colors}/>
      </Box>
    </Box>
  );
};
export default VerifyApplication;
