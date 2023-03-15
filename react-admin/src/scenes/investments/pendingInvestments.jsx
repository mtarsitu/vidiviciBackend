import { Box, IconButton,Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useAtom } from "jotai";
import { pendingInvestmentsAtom, investmentAprovedAtom, usersAtom,refreshAtom,entityIdAtom ,aproveInvestmentAtom} from "../../data/dataAtom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { userTableSx } from "../../data/sx/tableSx";
import Unauthorize from "../unauthorize";
import Information from "../information/information";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
const PendingInvestment = ({ useratom, authorized, mode, colors }) => {
  const [open, setOpen] = useState(false);
  const [infoId, setInfoId] = useState();
  const [, setInvestmentAproved] = useAtom(investmentAprovedAtom);
  const [,setEntityId] = useAtom(entityIdAtom);
  useAtom(aproveInvestmentAtom);
  const [partnerName, setPartnerName] = useState();
  const investments = useAtom(pendingInvestmentsAtom);
  const loggedUser = useratom;
  const [refresh, setRefresh] = useAtom(refreshAtom);
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
    { field: "dateCreated", headerName: "Data Creare", width: 200 },
    { field: "finalPaymentDate", headerName: "Data Finalizare", width: 130 },
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
            <Tooltip title={`Vezi informatii pentru ${row.row.client.username}`}>
            <IconButton
              color="inherit"
              onClick={() => handleOpen(row.row)}
            >
              <InfoIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title={`Verifica aplicatia pentru ${row.row.username}`}>
            <IconButton color="inherit" >
              <ManageAccountsIcon />
            </IconButton>
            </Tooltip>
            {/* <Tooltip title={`Editeaza user ${row.row.username}`}>
              <IconButton color="inherit">
                <EditIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title={`Accepta investitor ${row.row.username}`}>
              <IconButton color="inherit" onClick={() => handleAccept(row.row.id)} >
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const handleOpen = (user) => {
    console.log(user);
    setPartnerName(user);
    setInfoId(user.clientId);
    setEntityId(user.clientId);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleAccept = (investment) => {

    setInvestmentAproved(investment);
    setTimeout(() => {
      setRefresh(!refresh);
    }, 300);
    
  };
  return (
    <>
      {loggedUser != null ? (
        <Box m="10px">
          <Header title="INVESTITII IN ASTEPTARE" subtitle="Administrare Investitii" />
          <Box
            m="20px 0 0 0"
            height="75vh"
            sx={userTableSx(colors)}
          >
            <DataGrid
              rows={investments[0]}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7]}
              components={{ Toolbar: GridToolbar }}
             
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

export default PendingInvestment;
