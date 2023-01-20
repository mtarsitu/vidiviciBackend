import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import { usersAtom, entityIdAtom } from "../../data/dataAtom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import Information from "../information/information";
import Unauthorize from "../unauthorize";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EditIcon from "@mui/icons-material/Edit";

const PendingInvestors = ({ useratom, authorized,mode,colors }) => {
  const [open, setOpen] = useState(false);
  const [infoId, setInfoId] = useState();
  const [, setEntityId] = useAtom(entityIdAtom);
  const [partnerName, setPartnerName] = useState();
  const users = useAtom(usersAtom);
  const loggedUser = useratom;

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
            <IconButton color="inherit" onClick={() => handleOpen(row.id)}>
              <InfoIcon />
            </IconButton>
            <IconButton color="inherit">
              <ManageAccountsIcon />
            </IconButton>
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
            <IconButton color="inherit">
              <DoneAllIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleOpen = (id) => {
    setPartnerName(users[0].filter((entity) => entity.id === id)[0].username);
    setInfoId(id);
    setEntityId(id);
    setOpen(true);
  };


  return (
    <>
      {loggedUser != null ? (
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

          <Information props={infoId} partnerName={partnerName} open={open} handleClose={setOpen} mode={mode} colors={colors} />
        </Box>
      ) : (
        <Box>
          <Unauthorize errorMessage={"Nu esti autorizat"} />
        </Box>
      )}
    </>
  );
};

export default PendingInvestors;
