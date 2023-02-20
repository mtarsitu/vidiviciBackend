import { partnerAtom } from "../../data/partners/partnersAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { baseUrl } from "../../data/dataAtom";
import { DataGrid } from "@mui/x-data-grid";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";

const PartnerDetails = ({ colors }) => {
  const colorsTheme = colors;
  const partner = useAtom(partnerAtom)[0];
  const [details, setDetails] = useState();
  const [dataChart, setDataChart] = useState();
  const GetDetails = async () => {
    const response = await fetch(
      baseUrl + `PartnerDetails/getDetails?id=${partner.id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      setDetails(data);
      getChartData(data);
    }
  };
  const getChartData = (allDetails) => {
    let data = [];
    colors = [
      tokens("dark").greenAccent[500],
      tokens("dark").blueAccent[300],
      tokens("dark").redAccent[200],
      tokens("dark").purpleAccent[200],
    ];
    if (allDetails !== undefined) {
      for (let i = 0; i < allDetails.length; i++) {
        data[i] = {
          id: allDetails[i].year,
          color: colors[i],
          data: [
            {
              x: "Ebitda",
              y: allDetails[i].ebitda,
            },
            {
              x: "Active imobilizate",
              y: allDetails[i].fixedAssets,
            },
            {
              x: "Datorii",
              y: allDetails[i].debths,
            },
            {
              x: "Profit",
              y: allDetails[i].profit,
            },
          ],
        };
      }
    }
    setDataChart(data);
  };

  const columns = [
    { field: "year", headerName: "Anul" },
    {
      field: "profit",
      headerName: "Profit",
      cellClassName: "username-column--cell",
      width: 150,
    },

    { field: "fixedAssets", headerName: "Active imobilizate", width: 150 },
    { field: "earnings", headerName: "Cifra de afaceri", width: 150 },
    { field: "debths", headerName: "Datorii", width: 150 },
    { field: "ebitda", headerName: "EBITDA", width: 150 },
  ];
  console.log(partner);
  useEffect(() => {
    GetDetails();
  }, []);
  return (
    <div>
      {details !== undefined && (
        <Box m="10px">
          <Header
            title={partner.name.toUpperCase()}
            subtitle="Detalii companie"
          />
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            sx={{ marginLeft: 10 }}
            maxWidth="70vw"
          >
            <Box height="220px" m="10px 0 0 0" maxWidth="65vw" sx={{marginLeft:5}}>
              <LineChart isDashboard={true} data={dataChart} />
            </Box>
          </Box>
          <Box
            m="20px 0 0 0"
            height="45vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .username-column--cell": {
                color: colorsTheme.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colorsTheme.purpleAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colorsTheme.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colorsTheme.purpleAccent[700],
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colorsTheme.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={details}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                marginLeft: 15,
                width: "60vw",
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default PartnerDetails;
