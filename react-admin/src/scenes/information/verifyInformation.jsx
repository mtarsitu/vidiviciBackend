import { Box, Typography } from "@mui/material";

import { entityInformationAtom, entityIdAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";

const VerifyInformation = ({ colors, id, user }) => {
  const [, setEntityId] = useAtom(entityIdAtom);
  console.log(user);
  const entityInformation = useAtom(entityInformationAtom)[0];
  setEntityId(id);
  console.log(entityInformation);
  return (
    <>
      {entityInformation[0] && (
        <Box
          m="20px"
          backgroundColor={colors.primary[400]}
          sx={{ maxHeight: "35vh" }}
        >
          <Box>
            <Typography id="modal-modal-title" variant="h3" component="h2" >
              Informatii ale partenerului:&nbsp;
              {user}
            </Typography>

            <Box
              m="40px 0 0 0"
              height="15vh"
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
                display: "flex",
                "align-content": " center",
                "align-items": " center",
                "justify-content": "space-around",
                "flex-wrap": "wrap",
                "flex-direction": "row",
              }}
            >
              <Box marginTop={-8}>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Cnp: {entityInformation[0].cnp}
                </Typography>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Zi de nastere: {entityInformation[0].birthDate.split("T")[0]}
                </Typography>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Adresa: {entityInformation[0].address}
                </Typography>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Telefon: {entityInformation[0].phoneNumber}
                </Typography>
              </Box>
              <Box marginTop={-8}>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Banca: {entityInformation[0].bank}
                </Typography>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Cont bancar: {entityInformation[0].iban}
                </Typography>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Cui Firma: {entityInformation[0].cui}
                </Typography>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                  Reg Comertului: {entityInformation[0].regComertului}
                </Typography>
              </Box>

              {/* //checkboxSelection */}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerifyInformation;
