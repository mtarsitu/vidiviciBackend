import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import { allFundsAtom, fundsAtom } from "../../data/dataAtom";
import QueueIcon from '@mui/icons-material/Queue';
import { useState } from "react";
import { useEffect } from "react";
const Funds = ({ authorized }) => {
  const [showFunds,setShowFunds] = useState({});
  const funds = useAtom(fundsAtom);
  const allFunds = useAtom(allFundsAtom);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const authorize = authorized;
  console.log(showFunds,"abaabababa");
  useEffect(()=>{
    if(authorize){
      setShowFunds(allFunds[0]);
    }else setShowFunds(funds[0]);
  },[]);
  return (
    <Box m="20px">
      <Header title="Fonduri" subtitle="Oportunitati investitii" />
      {authorize && (
        <Box>
          
        <Button
          variant="contained"
          href="/adauga-fond"
          sx={{
            marginLeft: 5,
            marginRight: 5,
            backgroundColor: `neutral.main`,
          }}
        >
          <QueueIcon/> &nbsp; Adauga Fond
        </Button>
        </Box>
      )}
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
        {showFunds.length >0 &&
          showFunds.map((fund) => (
            <Card
              key={fund.id}
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
                  {fund.name}
                </Typography>
                <Typography variant="h5" component="div">
                  Dobanda {fund.interestRate}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Informatii suplimentare 1
                </Typography>
                <Typography variant="body2">
                  Informatii suplimentare 2
                  <br />
                  {'"informatii suplimentare 3"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{
                    color: `${colors.greenAccent[400]}`,
                  }}
                >
                  Aplica la aceasta opurtunitate{" "}
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default Funds;
