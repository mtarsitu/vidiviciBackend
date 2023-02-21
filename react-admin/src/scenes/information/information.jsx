import { Box, Modal, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { baseUrl } from "../../data/dataAtom";
import { useState } from "react";
import AddInformation from "./addInformation";

const Information = ({
  props,
  partnerName,
  open,
  handleClose,
  mode,
  colors,
}) => {
  const [entityInformation, setEntityInformation] = useState();
  const [newInfo, setNewInfo] = useState(false);
  const GetEntityInformation = async () => {
    const response = await fetch(
      baseUrl + "Informations/userInformations?id=" + props,
      {
        method: "GET",
        credentials: "include",
        headers: {
          accept: "text/plain",
        },
      }
    );
    if (response.ok) {
      let data = await response.json();
      setEntityInformation(data);
    }
  };

  const handleAddInfo = () => {
    setNewInfo(true);
  };
  const close = () => {
    handleClose(false);
  };
  useEffect(() => {
    GetEntityInformation();
  }, [props, newInfo]);

  return (
    <>
      {entityInformation !== undefined && (
        <Modal
          open={open}
          onClose={close}
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
              bgcolor:
                mode === "light" ? colors.primary[900] : colors.primary[400],
              border: "2px solid #000",
              boxShadow: 24,
              borderRadius: "12px",
              p: 4,
            }}
          >
            {partnerName !== undefined && (
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Informatii ale partenerului: {partnerName.username}
              </Typography>
            )}
            {entityInformation[0] === undefined && (
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
            )}

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
              {entityInformation[0] !== undefined ? (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Cnp: {entityInformation[0].cnp}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Zi de nastere: {entityInformation[0].birthDate.split("T")[0]}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Adresa: {entityInformation[0].address}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Telefon: {partnerName.phoneNumber}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Banca: {entityInformation[0].bank}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Cont bancar: {entityInformation[0].iban}
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h2"
                  >
                    Cui Firma: {entityInformation[0].cui}
                  </Typography>
                </>
              ) : (
                <>
                  {newInfo && (
                    <AddInformation
                      show={newInfo}
                      setShow={setNewInfo}
                      userId={props}
                      mode={mode}
                      colors={colors}
                    />
                  )}
                </>
              )}

              {/* //checkboxSelection */}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Information;
