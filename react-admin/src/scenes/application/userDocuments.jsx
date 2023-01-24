import { documentsAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
import { Box, ImageList } from "@mui/material";
import Header from "../../components/Header";
const UserDocuments = () => {
  const documents = useAtom(documentsAtom);


  return (
    <Box m="10px">
      <Header title="Documente" />
      <ImageList sx={{ width: 500, height: 350 }}>
        <img
          src={`data:image/png;base64,${documents[0].identityCardData}`}
          width="160%"
        />
      </ImageList>
    </Box>
  );
};

export default UserDocuments;
