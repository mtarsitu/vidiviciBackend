import { Box, IconButton, Typography, Button, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PendingIcon from "@mui/icons-material/Pending";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import QueueIcon from "@mui/icons-material/Queue";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import {
  usersAtom,
  entityIdAtom,
  deleteUserAtom,
  deleteUserIdAtom,
  refreshAtom,
} from "../../data/dataAtom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import Information from "../information/information";
import Unauthorize from "../unauthorize";
import EditUser from "./editUser";
import RoleRegister from "../account/roleRegister";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = ({ useratom, mode, colors }) => {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [infoId, setInfoId] = useState();
  const [userEdit, setUserEdit] = useState({});
  const [, setEntityId] = useAtom(entityIdAtom);
  const [partnerName, setPartnerName] = useState();
  const users = useAtom(usersAtom);
  const [, setDeleteUserId] = useAtom(deleteUserIdAtom);
  const deleteUser = useAtom(deleteUserAtom);
  const loggedUser = useratom;
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const handleAddUser = () => {
    setNewUser(true);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Username",
      cellClassName: "username-column--cell",
      width: 250,
    },

    { field: "firstName", headerName: "Nume", width: 130 },
    { field: "lastName", headerName: "Nume de familie", width: 130 },
    {
      field: "userRole",
      headerName: "Role",
      width: 150,
      renderCell: ({ row: { userRole } }) => {
        return (
          <Box
            width="80%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              userRole === "Admin"
                ? colors.purpleAccent[600]
                : userRole === "employee"
                ? colors.purpleAccent[700]
                : colors.purpleAccent[700]
            }
            borderRadius="4px"
          >
            {userRole === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {userRole === "Employee" && <SecurityOutlinedIcon />}
            {userRole === "Pending" && <PendingIcon />}
            {userRole === "Investor" && <CreditScoreIcon />}
            {userRole !== "Admin" &&
              userRole !== "Employee" &&
              userRole !== "Pending" &&
              userRole !== "Investor" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {userRole}
            </Typography>
          </Box>
        );
      },
    },
    { field: "usedPlatform", headerName: "Inregistrat cu", width: 130 },
    {
      field: "actions",
      headerName: "Actiuni",
      width: 150,
      sortable: false,
      renderCell: (row) => {
        return (
          <Box>
            <Tooltip title={`Vezi informatii pentru ${row.row.username}`}>
              {/* placement="right" */}
              <IconButton color="inherit" onClick={() => handleOpen(row.id)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            {/* <IconButton color="inherit">
              <ManageAccountsIcon />
            </IconButton> */}
            <Tooltip title={`Editeaza user ${row.row.username}`}>
              <IconButton color="inherit" onClick={() => handleEdit(row.row)}>
                {/*  */}
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Sterge user ${row.row.username}`}>
              <IconButton
                color="inherit"
                onClick={() => handleDelete(row.row.id)}
              >
                {/*  */}
                <DeleteIcon />
              </IconButton>
            </Tooltip>
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

  const handleClose = () => setOpen(false);
  const handleEdit = (u) => {
    setUserEdit(u);
  };
  const handleDelete = (id) => {
    setDeleteUserId(id);
    const timeout = setTimeout(() => {
      setRefresh(!refresh);
      setDeleteUserId("");
    }, 300);
  };

  return (
    <>
      {loggedUser != null ? (
        <Box m="10px">
          <Header title="UTILIZATORI" subtitle="Administrare utilizatori" />
          <Box>
            <Button
              variant="contained"
              onClick={handleAddUser}
              sx={{
                marginTop: -15,
                marginLeft: 25,
                backgroundColor: colors.purpleAccent[700],
              }}
            >
              <QueueIcon /> &nbsp; Adauga User Nou
            </Button>
          </Box>
          <Box
            m="-20px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .username-column--cell": {
                color: colors.greenAccent[300],
              },
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
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            {/* //checkboxSelection */}

            <DataGrid
              rows={users[0]}
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
            handleClose={handleClose}
            mode={mode}
            colors={colors}
          />

          <EditUser oldUser={userEdit} setUserEdit={setUserEdit} mode={mode} />

          {newUser && (
            <RoleRegister show={newUser} setShow={setNewUser} mode={mode} />
          )}
        </Box>
      ) : (
        <Box>
          <Unauthorize errorMessage={"Nu esti autorizat"} />
        </Box>
      )}
    </>
  );
};

export default Users;
