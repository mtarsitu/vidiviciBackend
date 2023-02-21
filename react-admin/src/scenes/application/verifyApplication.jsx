import { Box, Button } from "@mui/material";

import UserDocuments from "./userDocuments";
import VerifyInformation from "../information/verifyInformation";
import {
  acceptPendingIdAtom,
  refreshAtom,
  AcceptPendingAtom,
  entityInformationAtom,
} from "../../data/dataAtom";
import { useAtom } from "jotai";
import { useState } from "react";
const VerifyApplication = ({ show, setOpenManage, user, mode, colors, id,partnerName }) => {
  const [, setAcceptPendingId] = useAtom(acceptPendingIdAtom);
  const [refresh, setRefresh] = useAtom(refreshAtom);

  const userId = useState(id);
  useAtom(AcceptPendingAtom);
  const handleBack = () => {
    setOpenManage(!show);
  };
  const handleAccept = () => {
    // console.log(userId[0]);
    setAcceptPendingId(userId[0]);
    setTimeout(() => {
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
            marginRight: 5,
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
        <VerifyInformation mode={mode} colors={colors} id={id} user={user} partnerName={partnerName}/>
      <Box display="flex" justifyContent="space-evenly">
        {/* <UserApplication
          handleClose={setOpenManage}
          user={user}
          mode={mode}
          colors={colors}
        /> */}

        <UserDocuments colors={colors} />

      </Box>
    </Box>
  );
};
export default VerifyApplication;
