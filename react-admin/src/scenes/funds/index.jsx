import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import { allFundsAtom, fundsAtom } from "../../data/dataAtom";
import QueueIcon from "@mui/icons-material/Queue";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddFund from "./addFund";
const Funds = ({ authorized,mode,useratom }) => {
  const [showFunds, setShowFunds] = useState({});
  const funds = useAtom(fundsAtom);
  const allFunds = useAtom(allFundsAtom);
  const [showNew, setNew] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const authorize = authorized;

  const handleAddFund=()=>{
    setNew(true);
  }
  useEffect(() => {
    if (authorize) {
      setShowFunds(allFunds[0]);
    } else setShowFunds(funds[0]);
  }, [showNew]);
  return (
    <Box m="20px" >
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
      <Box
        m="-10px"
       
      >
        {showFunds.length > 0 &&
          showFunds.map((fund) => (
            <Card
              key={fund.id}
              sx={{
                minWidth: "150!important",
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
                {authorize ? (
                  <IconButton color="inherit">
                    {/* for admin to edit fund */}
                    <EditIcon />
                  </IconButton>
                ) : (
                  
                  <Button
                    size="small"
                    sx={{
                      color: `${colors.greenAccent[400]}`,
                    }}
                  >
                    Aplica la aceasta opurtunitate{" "}
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
      </Box>
      {showNew&&
      
      <AddFund show={showNew} setShow={setNew} mode={mode}/>
      }
    </Box>
  );
};

export default Funds;
