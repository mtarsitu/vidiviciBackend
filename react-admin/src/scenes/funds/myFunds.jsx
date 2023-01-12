import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import {  loggedUserAtom, myFundsAtom, usernameAtom } from "../../data/dataAtom";
import { useEffect } from "react";
const MyFunds = () => {
  const myFunds = useAtom(myFundsAtom);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="Investitii" subtitle="investitii personale in fonduri" />
      <Box
        m="20px"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 220px)", //the width of the card
          justifyContent: "center",
          gridGap: "50px",

          "& .MuiPaper-root": {
            width: 250,
          },
        }}
      >
        {myFunds[0] != null &&
          myFunds[0].investments.map((fund) => (
            <Card
              sx={{
                minWidth: "150!important",
                maxWidth: 350,
                marginBottom: 10,
                backgroundColor: `${colors.primary[400]}`,
              }}
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
                  Dobanda in procente {fund.fund.interestRate}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Suma initiala investita {fund.initialInvestmentAmount}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Data initiala a investitiei {fund.dateCreated}
                </Typography>
                <Typography variant="body2">
                  Urmatoarea zi de plata {fund.nextPaymentDate}
                  <br />
                  Dobanda {fund.rateOfInterest}
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
  );
};

export default MyFunds;
