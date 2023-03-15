
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import {
  usersAtom,
  applicationUserIdAtom,
  acceptPendingIdAtom,
  AcceptPendingAtom,
  refreshAtom,
} from "../../data/dataAtom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import Information from "../information/information";
import Unauthorize from "../unauthorize";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { userTableSx } from "../../data/sx/tableSx";
// import UserApplication from "../application/userApplication";
import VerifyApplication from "../application/verifyApplication";
const PendingInvestors = ({ useratom, authorized, mode, colors }) => {
  const [open, setOpen] = useState(false);
  const [openManage, setOpenManage] = useState(false);
  const [infoId, setInfoId] = useState();
  const [, setAcceptPendingId] = useAtom(acceptPendingIdAtom);
  useAtom(AcceptPendingAtom);
  const [, setApplicationUserId] = useAtom(applicationUserIdAtom);
  const [partnerName, setPartnerName] = useState();
  const users = useAtom(usersAtom);
  const loggedUser = useratom;
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Username", width: 250 },
    { field: "userRole", headerName: "Role", width: 130 },
    { field: "firstName", headerName: "Nume", width: 130 },
    { field: "lastName", headerName: "Nume de familie", width: 130 },

    {
      field: "actions",
      headerName: "Actiuni",
      width: 170,
      sortable: false,
      renderCell: (row) => {
        return (
          <Box>
            <Tooltip title={`Vezi informatii pentru ${row.row}`}>
              <IconButton color="inherit" onClick={() => handleOpen(row.row)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Verifica aplicatia pentru ${row.row.username}`}>
            <IconButton color="inherit" onClick={() => handleManage(row.row)}>
              <ManageAccountsIcon />
            </IconButton>
            </Tooltip>
            {/* <Tooltip title={`Editeaza user ${row.row.username}`}>
              <IconButton color="inherit">
                <EditIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title={`Accepta investitor ${row.row.username}`}>
              <IconButton color="inherit" onClick={() => handleAccept(row.id)}>
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];
  const handleManage = (user) => {

    setPartnerName(user);
    setInfoId(user.id);
    setApplicationUserId(user.id);
    setOpenManage(true);
  };
  const handleOpen = (user) => {
    setPartnerName(user);
    setInfoId(user.id);
    setApplicationUserId(user.id);
    setOpen(true);
  };

  const handleAccept = (id) => {
    setAcceptPendingId(id);
    const timeout = setTimeout(() => {
      setRefresh(!refresh);
    }, 300);
    timeout();
  };

  return (
    <>
      {loggedUser != null ? (
        <>
          {!openManage ? (
            <Box m="10px">
              <Header title="Utilizatori" subtitle="Administrare utilizatori" />
              <Box
                m="20px 0 0 0"
                height="75vh"
                sx={userTableSx(colors)}
              >
                <DataGrid
                  rows={users[0].filter(
                    (investor) => investor.userRole === "Pending"
                  )}
                  columns={columns}
                  pageSize={7}
                  rowsPerPageOptions={[7]}
                  components={{ Toolbar: GridToolbar }}
                />
              </Box>
              <Information
                props={infoId}
                partnerName={partnerName}
                open={open}
                handleClose={setOpen}
                mode={mode}
                colors={colors}
              />
            </Box>
          ) : (
            <VerifyApplication
              setOpenManage={setOpenManage}
              show={openManage}
              partnerName={partnerName}
              mode={mode}
              colors={colors}
              id={infoId}
            />
          )}
        </>
      ) : (
        <Box>
          <Unauthorize errorMessage={"Nu esti autorizat"} />
        </Box>
      )}
    </>
  );
};

export default PendingInvestors;
