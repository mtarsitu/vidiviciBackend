import { Box, Typography } from "@mui/material";
import StatBox from "../../components/StatBox";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import UploadDocuments from "../application/uploadDocuments";
import AddInformation from "../information/addInformation";
import InfoIcon from "@mui/icons-material/Info";
import AddPhoneNumber from "../users/addPhoneNumber";
import ConfirmSms from "../account/confirmSms";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VerifiedIcon from "@mui/icons-material/Verified";
import { requests } from "../../data/dataAtom";
import { refreshAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
const ProspectDashboard = ({ colors, useratom, mode }) => {
  const [showDoc, setshowDoc] = useState(false);
  const [newInformation, setNewInformation] = useState(false);
  const [showAddPhone, setShowAddPhone] = useState(false);
  const [showConfirmSms, setShowConfirmSms] = useState(false);
  const [section, setSection] = useState(0);
  const [entityInformation, setEntityInformation] = useState();
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const GetEntityInformation = async () => {
    setEntityInformation(
      await requests.Get(`Informations/userInformations?id=${useratom.id}`)
    );
  };

  const apply = () => {
    setTimeout(() => {
      setSection(0);
    }, 10);
    console.log(section, "apply");
    setTimeout(() => {
      if (entityInformation.length !== 0 && !useratom.uploadedDocuments) {
        setSection(2);
      }
      if (entityInformation.length !== 0 && useratom.uploadedDocuments) {
        setSection(3);
        console.log(section, "dupa");
      }
      if (entityInformation.length === 0) {
        setSection(1);
      }
    }, 20);
  };
  console.log(showAddPhone);
  useEffect(() => {
    GetEntityInformation();
  }, [newInformation]);
  useEffect(() => {
    setNewInformation(section === 1 ? true : false);
    setshowDoc(section === 2 ? true : false);
    setShowAddPhone(section === 3 ? true : false);
    setShowConfirmSms(section === 4 ? true : false);
    console.log("intra aici");
  }, [section]);
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
            Această platformă este dedicată acționarilor Vidi Vici Investments
            SA, având ca scop asigurarea transparenței privind activele și
            profiturile generate în timp real. Dacă ești unul dintre acționarii
            noștri, te rugăm să îți confirmi contul. Pentru a face acest lucru,
            urmand pasii de mai jos, este necesar să încarci o fotografie a
            buletinului tău de identitate, o poză cu extrasul de cont și să ai
            telefonul aproape pentru verifica numarul de telefon.
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
          <Box onClick={() => apply()} sx={{ cursor: "pointer" }}>
            <StatBox
              title={"Verificare actionar"}
              subtitle="Incepe procesul de validare"
              icon={
                <VerifiedIcon
                  sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
          {/* {!useratom.twoFactorEnabled && (
            <Box
              onClick={() => setShowAddPhone(true)}
              sx={{ cursor: "pointer" }}
            >
              <StatBox
                title={"1. Numar de telefon"}
                subtitle="Adauga si valideaza numar telefon"
                icon={
                  <PhoneIphoneIcon
                    sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          )}
          <Box
            onClick={() => setNewInformation(true)}
            sx={{ cursor: "pointer" }}
          >
            <StatBox
              title={"2. Detalii personale"}
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
              title={"3. Documente"}
              subtitle="Adauga documente necesare"
              icon={
                <DocumentScannerIcon
                  sx={{ color: colors.purpleAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box> */}
        </Box>

        <AddInformation
          show={newInformation}
          setShow={setNewInformation}
          userId={useratom.id}
          mode={mode}
          colors={colors}
          section={section}
          setSection={setSection}
        />

        <UploadDocuments
          show={showDoc}
          setShow={setshowDoc}
          mode={mode}
          colors={colors}
          user={useratom}
          setRefresh={setRefresh}
          refresh={refresh}
          section={section}
          setSection={setSection}
        />
        {!useratom.twoFactorEnabled && (
          <AddPhoneNumber
            show={showAddPhone}
            setShow={setShowAddPhone}
            setConfirm={setShowConfirmSms}
            mode={mode}
          />
        )}
        <ConfirmSms
          show={showConfirmSms}
          setShow={setShowConfirmSms}
          mode={mode}
        />
      </Box>
    </>
  );
};

export default ProspectDashboard;
