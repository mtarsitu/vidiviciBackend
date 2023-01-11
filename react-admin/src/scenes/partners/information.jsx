import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { entityIdAtom, entityInformationAtom } from "../../data/dataAtom";

const Information = ({ props }) => {
  const [, setEntityId] = useAtom(entityIdAtom);
  const entityInformation = useAtom(entityInformationAtom)[0];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const headers = [
    ...(entityInformation[0]
      ? Object.entries(entityInformation[0]).map((info) => {
          if (info[1] !== null  ) {
            if (info[0] === "id") {
              return {
                field: `${info[0]}`,
                headerName: `${info[0]}`,
                width: 40,
              };
            } else if (
              info[0] === "entityId" ||
              info[0] === "salary" ||
              info[0] === "regComertului" ||
              info[0] === "validContractDays" ||
              info[0] === "quantity"
            ) {
              return {
                field: `${info[0]}`,
                headerName: `${info[0]}`,
                width: 80,
              };
            }
            return {
              field: `${info[0]}`,
              headerName: `${info[0]}`,
              width: 200,
            };
          }
          return "";
        })
      : ""),
  ];

  const columns = headers.filter((element) => {
    return element !== "";
  });

  const rows = entityInformation;

  useEffect(() => {
    setEntityId(props);
    console.log("laa");
  });

  if (entityInformation[0]) {
    return (
      <Box
        m="40px 0 0 0"
        height="25vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* //checkboxSelection */}

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={2}
          rowsPerPageOptions={[2]}
        />
      </Box>
    );
  } else {
    return <div>Nici o Informatie</div>;
  }
};

export default Information;