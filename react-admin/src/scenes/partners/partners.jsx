import {
  Box,
  Typography,
  useTheme,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { tokens } from "../../theme";
import QueueIcon from "@mui/icons-material/Queue";
import { useEffect, useState } from "react";
import { baseUrl } from "../../data/dataAtom";
import Header from "../../components/Header";
import AddPartner from "./addPartner";
import AddPartnerDetails from "./addPartnerDetails";
import { useNavigate } from "react-router-dom";
import {
  partnerIdDetails,
  partnerAtom,
} from "../../data/partners/partnersAtom";
import { useAtom } from "jotai";

const Partners = ({ authorized, mode, useratom }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [partners, setPartners] = useState();
  const [refresh, setRefresh] = useState(false);
  const [openNewPartner, setOpenNewPartner] = useState(false);
  const [openNewDetail, setOpenNewDetail] = useState(false);
  const [partnerId, setPartnerId] = useState();
  const [, setPartneratom] = useAtom(partnerAtom);
  const GetPartners = async () => {
    const response = await fetch(baseUrl + "Partners/getAll", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      let data = await response.json();
      setPartners(data);
    }
  };
  console.log(partners);
  const handleAddPartner = () => {
    setOpenNewPartner(true);
  };

  const seeDetails = (partner) => {
    setPartneratom(partner);
    navigate("/detalii-companie");
  };
  const handleAddDetail = (id) => {
    setPartnerId(id);
    setOpenNewDetail(true);
  };
  useEffect(() => {
    GetPartners();
  }, []);

  return (
    <>
      <Box m="10px" backgroundColor={colors.primary[400]} maxHeight="55vh">
        <Header title="Partneri" />
        {authorized && (
          <Box>
            <Button
              variant="contained"
              onClick={handleAddPartner}
              sx={{
                marginTop: -15,
                marginLeft: 25,
                backgroundColor: colors.purpleAccent[700],
              }}
            >
              <QueueIcon /> &nbsp; Adauga partneri
            </Button>
          </Box>
        )}
      </Box>
      <Box>
        <Box m="40px" sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {partners !== undefined &&
            partners.map((partner) => (
              <Card
                key={partner.id}
                sx={{
                  maxHeight: 450,
                  minWidth: 450,
                  maxWidth: 450,
                  marginBottom: 10,
                  backgroundColor: `${colors.primary[400]}`,
                }}
              >
                <CardContent sx={{ marginLeft: 10 }}>
                  <img
                    src={`data:image/png;base64,${partner.logo}`}
                    width="130"
                    height="130"
                    alt="documentul utilizatorului"
                  />
                </CardContent>
                <CardContent>
                  <Typography variant="h3" color="text.secondary" gutterBottom>
                    {partner.name.toUpperCase()}
                  </Typography>
                </CardContent>

                <CardContent sx={{ height: 150, overflow:"scroll"}}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Descriere: {partner.description}
                  </Typography>
                </CardContent>

                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    {authorized && (
                      <Button
                        variant="contained"
                        onClick={() => handleAddDetail(partner.id)}
                        sx={{
                          backgroundColor: colors.purpleAccent[700],
                        }}
                      >
                        <QueueIcon /> &nbsp; Adauga detalii
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={() => seeDetails(partner)}
                      sx={{
                        backgroundColor: colors.purpleAccent[700],
                      }}
                    >
                      <QueueIcon /> &nbsp; Vezi detalii
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
        {openNewPartner && (
          <AddPartner
            show={openNewPartner}
            setShow={setOpenNewPartner}
            mode={mode}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        )}
        {openNewDetail && (
          <AddPartnerDetails
            id={partnerId}
            show={openNewDetail}
            setShow={setOpenNewDetail}
            mode={mode}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        )}
      </Box>
    </>
  );
};

export default Partners;
