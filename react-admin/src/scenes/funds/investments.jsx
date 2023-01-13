import { Box, IconButton, useTheme, Typography, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import { investmentsAtom, entityIdAtom } from "../../data/dataAtom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

import Unauthorize from "../unauthorize";


const Investments = ({useratom})=>{
  const [open, setOpen] = useState(false);
  const [infoId, setInfoId] = useState();
  const [, setEntityId] = useAtom(entityIdAtom);
  const [partnerName, setPartnerName] = useState();
  const investments = useAtom(investmentsAtom);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const loggedUser = useratom;
  console.log(investments);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "dateCreated", headerName: "Data Creare", width: 200 },
    { field: "finalPaymentDate", headerName: "Data Finalizare", width: 130 },
    { field: "initialInvestmentAmount", headerName: "Suma investita", width: 100 },
    { field: "rateOfInterest", headerName: "Dobanda", width: 80 },
    { 
      field: "clientname", 
      headerName:"Client", 
      width:300, 
      renderCell: (row) =>{
        return(
          <Box>
          {row.row.client.firstName} {row.row.client.lastName }
          </Box>);
      }
    },
    { 
      field: "fundName", 
      headerName:"Nume Fond", 
      width:130, 
      renderCell: (row) =>{
        return(
          <Box>
          {row.row.fund.name}
          </Box>);
      }
    },
    { 
      field: "rate", 
      headerName:"Dobanda", 
      width:80, 
      renderCell: (row) =>{
        return(
          <Box>
          {row.row.fund.interestRate} %
          </Box>);
      }
    },
    { 
      field: "private", 
      headerName:"Privat", 
      width:80, 
      renderCell: (row) =>{
        
        return(
          <Box>
          {row.row.fund.private? "Privat": "Public"} 
          </Box>);
      }
    },
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

  const handleOpen = (id) => {
    setPartnerName(
      investments[0].filter((entity) => entity.id === id)[0].username
    );
    console.log(id);
    setInfoId(id);
    setEntityId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {loggedUser != null ? (
        <Box m="20px">
          <Header title="INVESTITII" subtitle="Administrare Investitii" />
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
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.purpleAccent[200]} !important`,
              },
            }}
          >
            {/* //checkboxSelection */}

            <DataGrid
              rows={investments[0]}
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
                bgcolor: `${colors.blueAccent[700]}`,
                border: "2px solid #000",
                boxShadow: 24,
                borderRadius: "12px",
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Informatii ale partenerului: {partnerName}
              </Typography>
              {/* <Information props={infoId} /> */}
            </Box>
          </Modal>
        </Box>
      ) : (
        <Box>
          <Unauthorize errorMessage={"Nu esti autorizat"} />
        </Box>
      )}
    </>
  );
}

export default Investments;