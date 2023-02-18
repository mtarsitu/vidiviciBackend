import { Box, Typography } from "@mui/material";
import StatBox from "../../components/StatBox";
import ToProfesional from "../application/toProfessional";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Header from "../../components/Header";
import { useState } from "react";
import UploadDocuments from "../application/uploadDocuments";
import AddInformation from "../information/addInformation";
import InfoIcon from "@mui/icons-material/Info";
const ProspectDashboard = ({ colors, useratom, mode }) => {
  const [show, setShow] = useState(false);
  const [showDoc, setshowDoc] = useState(false);
  const [newInformation, setNewInformation] = useState(false);

  const handleOpenModal = () => {
    setShow(true);
  };

  const handleOpenDocuments = () => {
    setshowDoc(true);
  };

  return (
    <>
      <Box m="20px" sx={{ marginTop: 10 }}>
        <Box m="20">
          <Header
            title="Dashboard VidiVici"
            subtitle={`Bine ai venit ${useratom.firstName}`}
          />
          <Typography
            variant="h4"
            color={colors.grey[100]}
            
            sx={{ m: "0 0 5px 0" }}
          >
            Aceasta platforma este dedicata actionarilor Vidi Vici Investmets
            SA. SI are ca scop transparenta activelor si vizualizarea profitului
            in timp real. Daca esti unul dintre ei confirma-ti contul.
          </Typography>
        </Box>
        <Box
          m="30px"
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Box
            onClick={() => setNewInformation(true)}
            sx={{ cursor: "pointer" }}
          >
            <StatBox
              title={"1. Detalii personale"}
              subtitle="Adauga detalii"
              icon={
                <InfoIcon
                  sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box onClick={handleOpenDocuments} sx={{ cursor: "pointer" }}>
            <StatBox
              title={"2. Documente"}
              subtitle="Adauga documente necesare"
              icon={
                <DocumentScannerIcon
                  sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
          {/* <Box onClick={handleOpenModal} sx={{ cursor: "pointer" }}>
            <StatBox
              title={"3. Formular"}
              subtitle="Completeaza cu informatii necesare"
              icon={
                <NoteAltIcon
                  sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box> */}
        </Box>
        {/* <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{
          marginRight: 5,
          marginTop: 5,
          backgroundColor: colors.purpleAccent[700],
        }}
      >
        <QueueIcon /> &nbsp; Devino investitor profesionist
      </Button> */}
        <AddInformation
          show={newInformation}
          setShow={setNewInformation}
          userId={useratom.id}
          mode={mode}
          colors={colors}
        />
        {/* <ToProfesional
          show={show}
          setShow={setShow}
          user={useratom}
          mode={mode}
          colors={colors}
        /> */}
        <UploadDocuments
          show={showDoc}
          setShow={setshowDoc}
          mode={mode}
          colors={colors}
          user={useratom}
        />
      </Box>
    </>
  );
};

export default ProspectDashboard;
