import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  Pagination,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useAtom } from "jotai";
import { allFundsAtom, fundsAtom } from "../../data/dataAtom";
import QueueIcon from "@mui/icons-material/Queue";
import EditIcon from "@mui/icons-material/Edit";
import AddFund from "./addFund";
import { useEffect, useState } from "react";
import NewInvestment from "../investments/newInvestment";
const Funds = ({ authorized, mode, useratom }) => {
  const [newInvestmentModal, setNewInvestmentModal] = useState(false);
  const [fundId, setFundId] = useState("");
  const [showFunds, setShowFunds] = useState({});
  const [page, setPage] = useState(1);
  const [begin, setBegin] = useState(0);
  const funds = useAtom(fundsAtom);
  const ItemPerPage = 2;
  const allFunds = useAtom(allFundsAtom);
  const [showNew, setNew] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const authorize = authorized;
  const handleApply = (id) => {
    console.log(id);
    setFundId(id);
    setNewInvestmentModal(true);
  };
  const handleAddFund = () => {
    setNew(true);
  };
  const handlePageChange = (e, p) => {
    setPage(p);
    setBegin((p - 1) * ItemPerPage);
  };
  console.log(showFunds);
  useEffect(() => {
    if (authorize) {
      setShowFunds(allFunds[0]);
    } else setShowFunds(funds[0]);
  }, [showNew]);
  return (
    <Box m="20px">
      <Header title="Fonduri" subtitle="Oportunitati investitii" />
      {/* for admin to add fund */}
      {authorize && (
        <Box>
          <Button
            variant="contained"
            onClick={handleAddFund}
            sx={{
              marginTop: -15,
              marginLeft: 25,
              backgroundColor: colors.purpleAccent[700],
            }}
          >
            <QueueIcon /> &nbsp; Adauga Fond
          </Button>
        </Box>
      )}
      <Box m="-10px">
        {showFunds.length > 0 &&
          showFunds.slice(begin, begin + ItemPerPage).map((fund) => (
            <Card
              key={fund.id}
              sx={{
                minHeight: 240,
                minWidth: "150!important",
                marginBottom: 5,
                backgroundColor: `${colors.primary[400]}`,
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {fund.name}
                </Typography>
                <Typography variant="h5" component="div">
                  Moneda: {fund.currency}
                </Typography>
                <Typography variant="h5" component="div">
                  Dobanda {fund.interestRate}&nbsp;% /an
                </Typography>
                <Typography variant="h5" component="div">
                  Perioada:{" "}
                  {fund.period === 1
                    ? `${fund.period} an`
                    : `${fund.period} ani`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {fund.details}
                </Typography>
                <Typography variant="body2">
                  {fund.secondDetails === null
                    ? "Nici un detaliu secundar"
                    : fund.secondDetails}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                {authorize ? (
                  <IconButton color="inherit">
                    {/* for admin to edit fund */}
                    {/* <EditIcon /> */}
                  </IconButton>
                ) : (
                  <Button
                    size="small"
                    sx={{
                      color: `${colors.greenAccent[400]}`,
                    }}
                    onClick={() => handleApply(fund.id)}
                  >
                    Aplica la aceasta opurtunitate{" "}
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        <Pagination
          count={Math.round(showFunds.length / ItemPerPage)}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            marginLeft: -15,
          }}
          onChange={handlePageChange}
        />
      </Box>
      {showNew && <AddFund show={showNew} setShow={setNew} mode={mode} />}

      <NewInvestment
        show={newInvestmentModal}
        setShow={setNewInvestmentModal}
        fund={fundId}
        useratom={useratom}
        mode={mode}
      />
    </Box>
  );
};

export default Funds;
