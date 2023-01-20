import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Funds from "./scenes/funds";
import Contacts from "./scenes/contacts";

import { ToastContainer } from "react-toastify";
import Register from "./scenes/account/register";
import { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode,tokens } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/account/login";
import { useAtom } from "jotai";
import { loggedUserAtom } from "./data/dataAtom";
import MyInvestments from "./scenes/investments/myInvestments";
import Investments from "./scenes/investments/investments";
import AddFund from "./scenes/funds/addFund";
import PendingInvestors from "./scenes/users/pendingInvestors";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const loggedUser = useAtom(loggedUserAtom);
  const [authorize, setAuthorize] = useState(false);
  const [userName, setUserName] = useState("");
  const roles = {
    authorized: ["Admin", "Poweruser", "Employee"],
    unauthorize: ["Prospect", "Investor", "Pending"],
  };
 console.log(colors.primary[900],"app");
  
  useEffect(() => {
    if (loggedUser[0] != null) {
      setIsLogged(true);
      setUserName(loggedUser[0].username);
      if (roles.authorized.includes(loggedUser[0].userRole)) {
        setAuthorize(true);
      } else {
        setAuthorize(false);
      }
    }
  }, [isLogged]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* {isLogged && ( */}
        <div className="app">
          <Sidebar
            isSidebar={isSidebar}
            useratom={loggedUser[0]}
            authorized={authorize}
          />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} useratom={loggedUser[0]} />
            <Suspense fallback="LOADING">
              <Routes>
                <Route
                  path="/"
                  element={
                    authorize ? (
                      <Dashboard useratom={loggedUser[0]} />
                    ) : (
                      <Login useratom={loggedUser[0]} />
                    )
                  }
                />

                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      useratom={loggedUser[0]}
                      authorized={authorize}
                      mode={theme.palette.mode}
                      colors={colors}
                    />
                  }
                />
                <Route
                  path="/parteneri"
                  element={<Users useratom={loggedUser[0]} mode={theme.palette.mode} colors={colors}/>}
                />
                <Route
                  path="/myFunds"
                  element={<MyInvestments props={userName} />}
                />
                <Route path="/contacts" element={<Contacts />} />
                <Route
                  path="/funds"
                  element={<Funds authorized={authorize} mode={theme.palette.mode} />}
                />
                {/* <Route path="/role-register" element={<RoleRegister />} /> */}
                <Route path="/register" element={<Register />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route
                  path="/investments"
                  element={<Investments useratom={loggedUser[0]} mode={theme.palette.mode} colors={colors}/>}
                />
                <Route path="/adauga-fond" element={<AddFund />} />
                <Route
                  path="/useri-in-aprobare"
                  element={
                    <PendingInvestors
                      useratom={loggedUser[0]}
                      authorized={authorize}
                      mode={theme.palette.mode}
                      colors={colors}
                    />
                  }
                />
              </Routes>
            </Suspense>
          </main>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* )} */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
