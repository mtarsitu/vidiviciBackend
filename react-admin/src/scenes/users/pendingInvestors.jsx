
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
            <Tooltip title={`Vezi informatii pentru ${row.row.username}`}>
              <IconButton color="inherit" onClick={() => handleOpen(row.id)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Verifica aplicatia pentru ${row.row.username}`}>
            <IconButton color="inherit" onClick={() => handleManage(row.id)}>
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
  const handleManage = (id) => {
    setPartnerName(users[0].filter((entity) => entity.id === id)[0].username);
    setInfoId(id);
    setApplicationUserId(id);
    setOpenManage(true);
  };
  const handleOpen = (id) => {
    setPartnerName(users[0].filter((entity) => entity.id === id)[0].username);
    setInfoId(id);
    setApplicationUserId(id);
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
            <Box m="20px">
              <Header title="Utilizatori" subtitle="Administrare utilizatori" />
              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  // "& .name-column--cell": {
                  //   color: colors.purpleAccent[300],
                  // },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.purpleAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.purpleAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.purpleAccent[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                  },
                }}
              >
                {/* //checkboxSelection */}

                <DataGrid
                  rows={users[0].filter(
                    (investor) => investor.userRole === "Pending"
                  )}
                  columns={columns}
                  pageSize={7}
                  rowsPerPageOptions={[7]}
                  components={{ Toolbar: GridToolbar }}
                  // sx={{
                  //   width:"75vw"
                  // }}
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
              user={partnerName}
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
