import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { usernameAtom, myFundsAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
const MyInvestments = ({ useratom }) => {
  // const [myFunds, setMyFunds] = useState({});
  // const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [, setUsername] = useAtom(usernameAtom);
  setUsername(useratom.username);
  const myFunds = useAtom(myFundsAtom)[0];
  console.log(myFunds);

  return (
    <>
      <Box m="20px">
        <Header title="Investitii" subtitle="investitii personale in fonduri" />
        <Box
          m="20px"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 400px)", //the width of the card
            justifyContent: "center",
            gridGap: "100px",

            "& .MuiPaper-root": {
              width: 450,
            },
          }}
        >
          {myFunds.investments &&
            myFunds.investments.map((fund) => (
              <Card
                sx={{
                  minWidth: "400!important",
                  maxWidth: 450,
                  marginBottom: 10,
                  backgroundColor: `${colors.primary[400]}`,
                }}
                key={fund.id + "personalInvestment"}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {fund.fund.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                    Dobanda in procente: {fund.fund.interestRate}&nbsp;%
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Suma initiala investita: {fund.initialInvestmentAmount}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Data initiala a investitiei:{" "}
                    {fund.dateCreated.split("T")[0]}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Data incare suma initiala:{" "}
                    {fund.finalPaymentDate.split("T")[0]}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Urmatoarea zi de plata a profitului:{" "}
                    {fund.nextPaymentDate.split("T")[0]}
                  </Typography>
                  <Typography variant="h5" component="div">
                    Suma de incasat: {fund.rateOfInterest}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{
                      color: `${colors.greenAccent[400]}`,
                    }}
                  >
                    Vezi detalii{" "}
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default MyInvestments;
