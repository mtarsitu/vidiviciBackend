import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import { investmentsAtom, entityIdAtom } from "../../data/dataAtom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Unauthorize from "../unauthorize";
import Information from "../information/information";
const Investments = ({ useratom, mode, colors }) => {
  const [open, setOpen] = useState(false);
  const [infoId, setInfoId] = useState();
  const [, setEntityId] = useAtom(entityIdAtom);
  const [partnerName, setPartnerName] = useState();
  const investments = useAtom(investmentsAtom);
  const loggedUser = useratom;
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "clientname",
      headerName: "Client",
      width: 300,
      renderCell: (row) => {
        return (
          <Box>
            {row.row.client.firstName} {row.row.client.lastName}
          </Box>
        );
      },
    },
    {
      field: "fundName",
      headerName: "Nume Fond",
      width: 130,
      renderCell: (row) => {
        return <Box>{row.row.fund.name}</Box>;
      },
    },
    {
      field: "initialInvestmentAmount",
      headerName: "Suma investita",
      width: 100,
    },
    { field: "rateOfInterest", headerName: "Dobanda", width: 80 },
    {
      field: "rate",
      headerName: "Dobanda %",
      width: 80,
      renderCell: (row) => {
        return <Box>{row.row.fund.interestRate} %</Box>;
      },
    },
    {
      field: "dateCreated",
      headerName: "Data Creare",
      width: 100,
      renderCell: (row) => {
        return row.row.dateCreated.split("T")[0];
      },
    },
    {
      field: "nextPaymentDate",
      headerName: "Urmatoarea zi de plata",
      width: 130,
      renderCell: (row) => {
        return row.row.datesOfPayment[0].split("T")[0];
      },
    },
    {
      field: "finalPaymentDate",
      headerName: "Data Finalizare",
      width: 100,
      renderCell: (row) => {
        return row.row.finalPaymentDate.split("T")[0];
      },
    },
    {
      field: "private",
      headerName: "Privat",
      width: 80,
      renderCell: (row) => {
        return <Box>{row.row.fund.private ? "Privat" : "Public"}</Box>;
      },
    },
    {
      field: "actions",
      headerName: "Actiuni",
      width: 130,
      sortable: false,
      renderCell: (row) => {
        return (
          <Box>
            <IconButton color="inherit" onClick={() => handleOpen(row.row)}>
              <InfoIcon />
            </IconButton>
            <IconButton color="inherit">
              {/*  */}
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleOpen = (user) => {
    setPartnerName(user);
    setInfoId(user.clientId);
    setEntityId(user.clientId);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {loggedUser != null ? (
        <Box m="10px">
          <Header title="INVESTITII" subtitle="Administrare Investitii" />
          <Box
            m="20px 0 0 0"
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

          <Information
            props={infoId}
            open={open}
            partnerName={partnerName}
            handleClose={handleClose}
            mode={mode}
            colors={colors}
          />
        </Box>
      ) : (
        <Box>
          <Unauthorize errorMessage={"Nu esti autorizat"} />
        </Box>
      )}
    </>
  );
};

export default Investments;
