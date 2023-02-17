import { Box, IconButton, useTheme, Badge } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  notificationsAtom,
  notificationRefreshAtom,
  baseUrl,
  refreshAtom,
} from "../../data/dataAtom";
import Notifications from "../notifications/notifications";
import { useAtom } from "jotai";
// import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserAuth } from "../../data/AuthContext";

const Topbar = ({ useratom }) => {
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const notifications = useAtom(notificationsAtom);
  const [notificationRefresh, setNotificationRefresh] = useAtom(
    notificationRefreshAtom
  );

  const handleEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      let response = await fetch(baseUrl + "Accounts/logout", {
        method: "POST",
        credentials: "include",
      });

      toast.success(`${useratom.username}Te-ai delogat cu succes!`);

      await logOut();

      setRefresh(!refresh);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (
    useratom !== null &&
    useratom.userRole !== "Prospect" &&
    useratom.userRole !== "Investor"
  ) {
    setInterval(() => {
      setNotificationRefresh(!notificationRefresh);
    }, 1000 * 60 * 5);
  }
  return (
    <>
      <>
        {useratom != null && (
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
              {useratom.userRole === "Admin" && (
                <IconButton
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleClose}
                >
                  <Badge badgeContent={notifications[0].length}>
                    <NotificationsOutlinedIcon />
                  </Badge>
                  <Notifications
                    anchorEl={anchorEl}
                    open={open}
                    handleClose={handleClose}
                    notifications={notifications[0]}
                    colors={colors}
                  />
                </IconButton>
              )}
              <IconButton>
                <SettingsOutlinedIcon />
              </IconButton>
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </>
    </>
  );
};

export default Topbar;
