import {
  Box,
  Typography,
  useTheme,
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
} from "@mui/material";
import { tokens } from "../../theme";
import QueueIcon from "@mui/icons-material/Queue";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import AddPartner from "./addPartner";
import AddPartnerDetails from "./addPartnerDetails";
import { useNavigate } from "react-router-dom";
import { partnerAtom } from "../../data/partners/partnersAtom";
import { useAtom } from "jotai";
import { requests } from "../../data/dataAtom";

const Partners = ({ authorized, mode, useratom }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [partners, setPartners] = useState();
  const [refresh, setRefresh] = useState(false);
  const [openNewPartner, setOpenNewPartner] = useState(false);
  const [openNewDetail, setOpenNewDetail] = useState(false);
  const [partnerId, setPartnerId] = useState();
  const [page, setPage] = useState(1);
  const [begin, setBegin] = useState(0);
  const [, setPartneratom] = useAtom(partnerAtom);
  const ItemPerPage = 2;
  const GetPartners = async () => {
    const response = await requests.Get("Partners/getAll");
    setPartners(response);
  };

  const handleAddPartner = () => {
    setOpenNewPartner(true);
  };

  const handlePageChange = (e, p) => {
    setPage(p);
    setBegin((p - 1) * ItemPerPage);
    // _DATA.jump(p);
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
  }, [refresh]);

  return (
    <>
      <Box m="10px">
        <Header title="Partneri" subtitle="In care noi investim" />
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

      <Grid m="20px" container spacing={8} maxWidth="75vw" sx={{marginTop:-10}}>
        {partners !== undefined &&
          partners.slice(begin, begin + ItemPerPage).map((partner) => (
            <Grid item xs={6} key={partner.id}>
              <Card
                key={partner.id}
                sx={{
                  backgroundColor: `${colors.primary[400]}`,
                  minHeight: 500,
                }}
              >
                <CardContent sx={{ marginLeft: 10 }}>
                  <img
                    src={`data:image/png;base64,${partner.logo}`}
                    width="100"
                    height="100"
                    alt="documentul utilizatorului"
                  />
                </CardContent>
                <CardContent>
                  <Typography variant="h3" color="text.secondary" gutterBottom>
                    {partner.name.toUpperCase()}
                  </Typography>
                </CardContent>

                <CardContent sx={{ height: "30vh" }}>
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
            </Grid>
          ))}
      </Grid>
      {partners !== undefined && (
        <Pagination
          count={Math.round(partners.length / ItemPerPage)}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            marginLeft: -15,
          }}
          onChange={handlePageChange}
        />
      )}
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
    </>
  );
};

export default Partners;
