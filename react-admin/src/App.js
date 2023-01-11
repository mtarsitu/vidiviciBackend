import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Partners from "./scenes/partners";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Register from "./scenes/account/index"
import { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/account/login";
import { useAtom } from "jotai";
import { isLoggedAtom, loggedUserAtom } from "./data/dataAtom";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const loggedUser = useAtom(loggedUserAtom);
  console.log(loggedUser);
  const [isLogged,] = useAtom(isLoggedAtom);
  console.log(isLogged);
  
  useEffect(()=>{
    console.log((isLogged));
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />  
        {loggedUser.length==0 &&
          <Routes>
          <Route path="/" element={<Login/>} />
        </Routes>
        }
        
        {loggedUser.length>0  &&
          <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Suspense fallback="LOADING">
              <Routes>
                <Route path="/dashbord" element={<Dashboard />} />
                <Route path="/parteneri" element={<Partners />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/register" element={<Register />} />

                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        }
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
