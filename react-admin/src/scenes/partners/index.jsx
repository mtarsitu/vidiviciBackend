import { Box, IconButton, useTheme, Typography, Modal } from "@mui/material";
import { DataGrid,GridToolbar  } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import { entitiesAtom,entityIdAtom } from "../../data/dataAtom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import Information from "./information";
const Partners = () => {
  const [infoId, setInfoId] = useState();
  const [, setEntityId] = useAtom(entityIdAtom);
  const [partnerName, setPartnerName] = useState();
  const entities = useAtom(entitiesAtom);
  console.log(entities);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Username", width: 250 },
    { field: "userRole", headerName: "Role", width: 130 },
    { field: "firstName", headerName: "Nume", width: 130 },
    { field: "lastName", headerName: "Nume de familie", width: 130 },

    {
      field: "actions",
      headerName: "Actiuni",
      width: 130,
      sortable: false,
      renderCell: (row) => {
        return (
          <Box>
            <IconButton color="inherit" onClick={() => handleOpen(row.id)}>
              <InfoIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setPartnerName(
      entities[0].filter((entity) => entity.id === id)[0].username
    );
    console.log(id);
    setInfoId(id);
    setEntityId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
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
          "& .name-column--cell": {
            color: colors.purpleAccent[300],
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
          "& .MuiCheckbox-root": {
            color: `${colors.purpleAccent[200]} !important`,
          },
        }}
      >
        {/* //checkboxSelection */}

        <DataGrid
          rows={entities[0]}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          components={{ Toolbar: GridToolbar }}
          // sx={{
          //   width:"75vw"
          // }}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            bgcolor: colors.primary[400],
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "12px",
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Informatii ale partenerului: {partnerName}
          </Typography>
          <Information props={infoId} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Partners;
