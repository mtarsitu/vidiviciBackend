import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

// import SearchIcon from "@mui/icons-material/Search";
import { Logout } from "../../data/dataAtom";
const Topbar = ({ useratom }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const user = useratom;
  return (
    <>
      {user != null && (
        <Box display="flex" justifyContent="space-between" p={2}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
           
            {theme.palette.mode === "dark" ? (
              <img
                alt="profile-user"
                width="250px"
                height="150px"
                src={`../../../assets/vidivici-logo.png`}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  position: "absolute",
                  marginLeft: "-70px",
                  marginTop: "-50px",
                }}
              />
            ) : (
              <img
                alt="profile-user"
                width="250px"
                height="150px"
                src={`../../../assets/logo-inchis.png`}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  position: "absolute",
                  marginLeft: "-70px",
                  marginTop: "-50px",
                }}
              />
            )}
            {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
          </Box>
         
          {/* ICONS */}
          <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                Logout();
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Topbar;
