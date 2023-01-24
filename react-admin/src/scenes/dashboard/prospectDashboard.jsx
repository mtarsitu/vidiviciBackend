import { Box, Button, Typography } from "@mui/material";
import StatBox from "../../components/StatBox";
import ToProfesional from "../application/toProfessional";
import QueueIcon from "@mui/icons-material/Queue";
import Header from "../../components/Header";
import { useState } from "react";
import UploadDocuments from "../application/uploadDocuments";
const ProspectDashboard = ({ colors, useratom, mode }) => {
  const [show, setShow] = useState(false);
  const [showDoc, setshowDoc] = useState(false);
  const handleOpenModal = () => {
    setShow(true);
  };

  const handleOpenDocuments = () => {
    setshowDoc(true);
  };

  return (
    <>
      <Box m="20px" sx={{ marginTop: 10 }}>
        <Box>
          <Header
            title="Dashboard VidiVici"
            subtitle={`Bine ai venit ${useratom.firstName}`}
          />
          <Typography
            variant="h4"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            Legea impune sa devii investitor profesional pentru a putea
            investii. Pentru a devenit investitor profesional, ai nevoie sa
            incarci documentele cerute in pasii urmatori, sa completezi
            formularul cu detalii personale si chestionarul investitorului
            profesional. Poti urma pasii de mai jos apasand butoanele aferente.
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
          <Box onClick={handleOpenModal} sx={{ cursor: "pointer" }}>
            <StatBox
              title={"Investitor Profesional"}
              subtitle="Aplica pentru a investii"
              icon={
                <QueueIcon
                  sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box onClick={handleOpenDocuments} sx={{ cursor: "pointer" }}>
            <StatBox
              title={"Documente"}
              subtitle="Adauga documente necesare"
              icon={
                <QueueIcon
                  sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
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

        <ToProfesional
          show={show}
          setShow={setShow}
          user={useratom}
          mode={mode}
          colors={colors}
        />
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
