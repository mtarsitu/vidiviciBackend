import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PendingIcon from "@mui/icons-material/Pending";
const Item = ({ title, title2, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      {title2 === undefined ? (
        <Typography>{title} </Typography>
      ) : (
        <>
          <Typography>{title} </Typography>
          <Typography>{title2} </Typography>
        </>
      )}
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ useratom, authorized }) => {
  const loggedUser = useratom;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const authorize = authorized;
  return (
    <>
      {loggedUser != null && (
        <Box
          sx={{
            "& .pro-sidebar-inner": {
              background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
              color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
              color: "#6870fa !important",
            },
          }}
        >
          <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
              {/* LOGO AND MENU ICON */}

              {/* {!isCollapsed &&
                (theme.palette.mode === "dark" ? (
                  <img
                    alt="profile-user"
                    width="250px"
                    height="150px"
                    src={`../../../assets/vidivici-logo.png`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      position: "absolute",
                      marginLeft: "-50px",
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
                      marginLeft: "-50px",
                      marginTop: "-50px",
                    }}
                  />
                ))} */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={
                  isCollapsed ? (
                    <MenuOutlinedIcon />
                  ) : (
                    <MenuOpenIcon sx={{ marginLeft: 45 }} />
                  )
                }
                style={{
                  margin: "10px 0 20px 0",
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <IconButton
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      sx={{ marginLeft: "160px" }}
                    >
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb="25px">
                  <Box textAlign="center" marginBottom="20px">
                    <Typography
                      variant="h3"
                      color={colors.purpleAccent[400]}
                      fontWeight="bold"
                      sx={{ m: "10px 0 0 0" }}
                    >
                      Vidi Vici
                    </Typography>
                    <Typography variant="h5" color={colors.purpleAccent[400]}>
                      We come We conquered
                    </Typography>
                  </Box>
                  <Divider />
                  {/* <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // marginTop="20px"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`../../assets/techaine-logo-g.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box> */}
                  <Box textAlign="center">
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "10px 0 0 0" }}
                    >
                      {loggedUser.firstName}&ensp; {loggedUser.lastName}
                    </Typography>
                    <Typography variant="h6" color={colors.purpleAccent[400]}>
                      {loggedUser != null && loggedUser.userRole}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="Acasa"
                  to="/dashboard"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Date
                </Typography>
                {authorize && (
                  <>
                    <Item
                      title="Utilizatori"
                      to="/parteneri"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    {/* <Item
                      title="Informatii"
                      to="/contacts"
                      icon={<ContactsOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    /> */}

                    <Item
                      title="Investitii"
                      to="/investments"
                      icon={<AccountBalanceWalletIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}
                {useratom.userRole !== "Prospect" &&
                  useratom.userRole !== "Pending" && (
                    <Item
                      title="Unde investim"
                      to="/partneri"
                      icon={<BusinessIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  )}
                {!authorize &&
                  useratom.userRole !== "Prospect" &&
                  useratom.userRole !== "Pending" && (
                    <>
                      <Item
                        title="Investitiile mele"
                        to="/myfunds"
                        icon={<AccountBalanceWalletIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Tipuri de investitii"
                        title2="/ Obligatiuni"
                        to="/funds"
                        icon={<ReceiptOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </>
                  )}
                {authorize && (
                  <>
                    <Item
                      title="Calendar"
                      to="/calendar"
                      icon={<CalendarTodayOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Tipuri de investitii"
                      title2="/ Obligatiuni"
                      to="/funds"
                      icon={<ReceiptOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Actiuni
                </Typography>
                {authorize && (
                  <>
                    {/* <Item
                      title="Inregistreaza user"
                      to="/role-register"
                      icon={<PersonOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    /> */}
                    <Item
                      title="Investitori in aprobare"
                      to="/useri-in-aprobare"
                      icon={<PendingActionsIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      title="Investitii in asteptare"
                      to="/investitii-in-asteptare"
                      icon={<PendingIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}
                <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Menu>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              // marginTop="20px"
            >
              <img
                alt="profile-user"
                width="50px"
                height="50px"
                src={`../../assets/techaine-logo-g.png`}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
          </ProSidebar>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
