import { partnerAtom } from "../../data/partners/partnersAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box, Tooltip, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
import { requests } from "../../data/dataAtom";
import EditDetails from "./editDetailsPartner";
import EditIcon from "@mui/icons-material/Edit";

const PartnerDetails = ({ colors,mode }) => {
  const colorsTheme = colors;
  const partner = useAtom(partnerAtom)[0];
  const [details, setDetails] = useState();
  const [dataChart, setDataChart] = useState();
  const [openEditDetails, setOpenEditDetails] = useState(false);
  const [detailToEdit, setDetailToEdit] = useState({});

  const GetDetails = async () => {
    const response = await requests.Get(
      `PartnerDetails/getDetails?id=${partner.id}`
    );
    setDetails(response);
    getChartData(response);
  };

  const handleEditDetails = async (details) => {
    setDetailToEdit(details);
    setOpenEditDetails(true);
  };
  const getChartData = (allDetails) => {
    let finalData = [
      {
        id: "Profit",
        color: colors[0],
        data: [],
      },
      {
        id: "Cifra de Afaceri",
        color: colors[1],
        data: [],
      },
    ];
    colors = [
      tokens("dark").greenAccent[500],
      tokens("dark").blueAccent[300],
      tokens("dark").redAccent[200],
      tokens("dark").purpleAccent[200],
    ];
    
    if (allDetails !== undefined) {
      for (let i = 0; i < allDetails.length; i++) {
        finalData[0].data.push({
          x: allDetails[i].year.toString(),
          y: allDetails[i].profit,
        });

        finalData[1].data.push({
          x: allDetails[i].year.toString(),
          y: allDetails[i].earnings,
        });
      }
    }
    setDataChart(finalData);
  };
  // Cifra Afaceri
  // Profit Net
  // Datorii
  // Active Imobilizate
  // Active Circulante
  // Capitaluri Proprii
  // EBITDA ?????
  console.log(finalData);
  console.log(colors);
  const columns = [
    { field: "year", headerName: "Anul" },
    { field: "earnings", headerName: "Cifra de afaceri", width: 150 },
    {
      field: "profit",
      headerName: "Profit Net",
      cellClassName: "username-column--cell",
      width: 150,
    },
    { field: "debths", headerName: "Datorii", width: 150 },
    { field: "fixedAssets", headerName: "Active Imobilizate", width: 150 },
    { field: "circulantAssets", headerName: "Active Circulante", width: 150 },
    { field: "ownCapitals", headerName: "Capitaluri propii", width: 150 },
    { field: "ebitda", headerName: "EBITDA", width: 150 },
    {
      field: "actions",
      headerName: "Actiuni",
      width: 150,
      sortable: false,
      renderCell: (row) => {
        return (
          <Box>
            <Tooltip title={`Editeaza user ${row.row.username}`}>
              <IconButton
                color="inherit"
                onClick={() => handleEditDetails(row.row)}
              >
                {/*  */}
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    GetDetails();
  }, []);
  return (
    <>
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
            <Box
              height="220px"
              m="10px 0 0 0"
              maxWidth="90%"
              width="90%"
              sx={{ marginLeft: 5 }}
            >
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
                marginLeft: 10,
                width: "88%",
                maxWidth: "90%",
              }}
            />
          </Box>
        </Box>
      )}
      {openEditDetails && (
        <EditDetails
          oldDetails={detailToEdit}
          setDetailToEdit={setDetailToEdit}
          mode={mode}
          show={openEditDetails}
          setShow={setOpenEditDetails}
          refresh={GetDetails}
        />
      )}
    </>
  );
};

export default PartnerDetails;
