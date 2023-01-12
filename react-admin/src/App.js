import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Funds from "./scenes/funds";
import Contacts from "./scenes/contacts";
import RoleRegister from "./scenes/account/roleRegister";
import Register from "./scenes/account/register";
import { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/account/login";
import { useAtom } from "jotai";
import { loggedUserAtom } from "./data/dataAtom";
import MyFunds from "./scenes/funds/myFunds";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const loggedUser = useAtom(loggedUserAtom);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (loggedUser[0] != null) {
      setIsLogged(true);
      setUserName(loggedUser[0].username)
    }
  }, [isLogged]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {!isLogged && (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
        <CssBaseline />

        {isLogged && (
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Suspense fallback="LOADING">
                <Routes>
                  <Route path="/dashbord" element={<Dashboard />} />
                  <Route path="/parteneri" element={<Users />} />
                  <Route path="/myFunds" element={<MyFunds props={userName} />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/funds" element={<Funds />} />
                  <Route path="/role-register" element={<RoleRegister />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/calendar" element={<Calendar />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
