import { documentsAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import Header from "../../components/Header";
const UserDocuments = ({ colors }) => {
  const documents = useAtom(documentsAtom);
  console.log(documents);
  return (
    <Box m="10px" backgroundColor={colors.primary[400]} maxHeight="55vh">
      <Header title="Documente" />
      <ImageList sx={{ width: 800, height: 350 }}>
        <ImageListItem key={documents[0].idTitle}>
          <Typography>Buletin</Typography>
          <img
            src={`data:image/png;base64,${documents[0].idImage}`}
            width="160%"
            alt="documentul utilizatorului"
          />
        </ImageListItem>
        <ImageListItem key={documents[0].bankStatementTitle}>
          <Typography>Extras de cont</Typography>
          <img
            src={`data:image/png;base64,${documents[0].bankStatementImage}`}
            width="160%"
            alt="documentul utilizatorului"
          />
        </ImageListItem>
      </ImageList>
    </Box>
  );
};

export default UserDocuments;
