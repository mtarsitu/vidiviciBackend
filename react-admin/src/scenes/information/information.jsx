import { Box, useTheme, Modal, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useAtom } from "jotai";
import { entityIdAtom, entityInformationAtom } from "../../data/dataAtom";
import { useState } from "react";
import AddInformation from "./addInformation";
const Information = ({ props, partnerName, open, handleClose, mode }) => {
  const [, setEntityId] = useAtom(entityIdAtom);
  const entityInformation = useAtom(entityInformationAtom)[0];
  const theme = useTheme();
  const modalBackground = theme.palette.mode ? "dark" : "light";
  const colors = tokens(theme.palette.mode);
  const [newInfo, setNewInfo] = useState(false);
  setEntityId(props);
  const handleAddInfo = () => {setNewInfo(true)};
  const headers = [
    ...(entityInformation[0]
      ? Object.entries(entityInformation[0]).map((info) => {
          if (info[1] !== null) {
            if (info[0] === "id") {
              return {
                field: `${info[0]}`,
                headerName: `${info[0]}`,
                width: 40,
              };
            } else if (
              info[0] === "entityId" ||
              info[0] === "salary" ||
              info[0] === "regComertului" ||
              info[0] === "validContractDays" ||
              info[0] === "quantity"
            ) {
              return {
                field: `${info[0]}`,
                headerName: `${info[0]}`,
                width: 80,
              };
            }
            return {
              field: `${info[0]}`,
              headerName: `${info[0]}`,
              width: 200,
            };
          }
          return "";
        })
      : ""),
  ];

  const columns = headers.filter((element) => {
    return element !== "";
  });

  const rows = entityInformation;

  return (
    <>
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
            bgcolor: mode === "light" ? colors.primary[900] : colors.primary[400],
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "12px",
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Informatii ale partenerului: {partnerName}
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddInfo}
            sx={{
              marginTop: -5,
              marginLeft: 55,
              backgroundColor: colors.purpleAccent[700],
            }}
          >
            Adauga informatie
          </Button>
          <Box
            m="40px 0 0 0"
            height="25vh"
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
              rows={rows}
              columns={columns}
              pageSize={2}
              rowsPerPageOptions={[2]}
            />
          </Box>
        </Box>
      </Modal>

      {newInfo && <AddInformation show={newInfo} setShow={setNewInfo} userId={props} mode={mode}/>}
    </>
  );
};

export default Information;
