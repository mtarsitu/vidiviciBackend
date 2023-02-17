import { documentsAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
import { Box, ImageList } from "@mui/material";
import Header from "../../components/Header";
const UserDocuments = ({ colors }) => {
  const documents = useAtom(documentsAtom);

  return (
    <Box m="10px" backgroundColor={colors.primary[400]} maxHeight="55vh">
      <Header title="Documente" />
      <ImageList sx={{ width: 500, height: 350 }}>
        <img
          src={`data:image/png;base64,${documents[0].identityCardData}`}
          width="160%"
          alt="documentul utilizatorului"
        />
      </ImageList>
    </Box>
  );
};

export default UserDocuments;
