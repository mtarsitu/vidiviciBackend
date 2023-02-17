import { atom, useSetAtom } from "jotai";
import { toast } from "react-toastify";

const baseUrl = "https://vidivici.azurewebsites.net/";

export let isLoggedAtom = atom(false);
export const refreshAtom = atom(false);
export const refreshFundsAtom = atom(false);
export const entityIdAtom = atom("");
export const usernameAtom = atom("");
export const userToLoginAtom = atom({});
export const newFondAtom = atom("");
export const newInformationAtom = atom("");
export const newApplicationAtom = atom("");
export const userExternalAtom = atom("");
export const applicationUserIdAtom = atom("");
export const acceptPendingIdAtom = atom("");
export const deleteUserIdAtom = atom("");
export const notificationRefreshAtom = atom(false);
export const investmentAprovedAtom = atom("");
export const loggedUserAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(baseUrl + "Accounts/currentUser", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  if (response.ok) {
    // isLoggedAtom.init = true;
    return await response.json();
  }
  return null;
});

export const fundsAtom = atom(async (get) => {
  get(refreshFundsAtom);
  const response = await fetch(baseUrl + "Funds/getAllPublic", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  if (response.ok) {
    return await response.json();
  }
  return null;
});

export const notificationsAtom = atom(async (get) => {
  get(notificationRefreshAtom);
  const user = get(loggedUserAtom);
  if (user !== null && user.userRole === "Admin") {
    const response = await fetch(baseUrl + "Notifications/getAll", {
      method: "GET",
      credentials: "include",
      headers: {
        accept: "text/plain",
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    }
    return null;
  }
});

export const deleteUserAtom = atom(async (get) => {
  let id = get(deleteUserIdAtom);

  if (id) {
    let response = await fetch(baseUrl + `Admins/deleteUser?id=${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("User sters cu success");
    } else {
      toast.error("Nu a functionat, te rugam sa incerci din nou");
    }
  }
});

export const ExternalLoginAtom = atom(async (get) => {
  const userToLogin = get(userExternalAtom);
  if (Object.keys(userToLogin).length !== 0) {
    let response = await fetch(`https://vidivici.azurewebsites.net/Accounts/external`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    });

    if (response.ok) {
      toast.success(`${userToLogin.firstName} Te-ai logat cu succes!`);
      const timeout = () => {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      };
      timeout();
      return response.ok;
    } else {
      toast.warning("Username sau parola gresita");
    }
  }
});

export const AcceptPendingAtom = atom(async (get) => {
  let id = get(acceptPendingIdAtom);
  if (id.length > 0) {
    let response = await fetch(baseUrl + `Admins/acceptPending?id=${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Investitor inregistrat cu succces");
    } else toast.error("Nu a functionat, te rugam sa incerci din nou!");
  }
});

export const RegisterApplicationAtom = atom(async (get) => {
  const application = get(newApplicationAtom);
  if (Object.keys(application).length !== 0) {
    const response = await fetch(baseUrl + "Applications/add", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });
    if (response.ok) {
      toast.success("Inregistrare adaugata cu succes");
      return response.ok;
    }
    return console.error("Nu a fost adaugata aplicatia");
  }
});

export const RegisterFundAtom = atom(async (get) => {
  const fond = get(newFondAtom);
  if (Object.keys(fond).length !== 0) {
    const response = await fetch(baseUrl + `Funds/addFund`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fond),
    });
    if (response.ok) {
      toast.success("Fond adaugat cu succes");
      return response.ok;
    }
    return console.error("Nu a fost adaugat fondul");
  }
});

export const RegisterInformationAtom = atom(async (get) => {
  const info = get(newInformationAtom);

  if (Object.keys(info).length !== 0) {
    const response = await fetch(baseUrl + "Informations/addInformation", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    if (response.ok) {
      toast.success("Informatie adaugata cu succes");

      return response.ok;
    }
    return console.error("Informatia nu a fost adaugata");
  }
});

export const LogInAtom = atom(async (get) => {
  const userToLogin = get(userToLoginAtom);
  if (Object.keys(userToLogin).length !== 0) {
    let response = await fetch(`https://vidivici.azurewebsites.net/Accounts/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToLogin),
    });
    if (Object.keys(userToLogin).length !== 0) {
      if (response.ok) {
        toast.success(`${userToLogin.username} Te-ai logat cu succes!`);
        const timeout = () => {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        };
        timeout();
        return response.ok;
      } else {
        toast.warning("Username sau parola gresita aici");
      }
    }
  }
});

export const allFundsAtom = atom(async (get) => {
  get(refreshFundsAtom);
  const response = await fetch(baseUrl + "Funds/getAll", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  if (response.ok) {
    return await response.json();
  }
  return null;
});

export const myFundsAtom = atom(async (get) => {
  const name = get(usernameAtom);
  console.log(name);
  const response = await fetch(
    baseUrl + "Investments/UserAndInvestments?username=" + name,
    {
      method: "GET",
      credentials: "include",
      headers: {
        accept: "text/plain",
      },
    }
  );
  if (response.ok) {
    return await response.json();
  }
  return null;
});

export const applicationAtom = atom(async (get) => {
  const id = get(applicationUserIdAtom);
  const response = await fetch(baseUrl + `Applications/get?clientId=${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  if (response.ok) {
    return await response.json();
  }
  return null;
});

export const documentsAtom = atom(async (get) => {
  const id = get(applicationUserIdAtom);
  const response = await fetch(
    baseUrl + `Applications/getDocuments?clientId=${id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        accept: "text/plain",
      },
    }
  );
  if (response.ok) {
    return await response.json();
  }
  return null;
});

export const usersAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(baseUrl + "Admins/AllUser", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  return await response.json();
});

export const entityInformationAtom = atom(async (get) => {
  const id = get(entityIdAtom);
  get(refreshAtom);

  const response = await fetch(
    baseUrl + "Informations/userInformations?id=" + id,
    {
      method: "GET",
      credentials: "include",
      headers: {
        accept: "text/plain",
      },
    }
  );
  return response.json();
});

export const aproveInvestmentAtom = atom(async (get) => {
  const aproved = get(investmentAprovedAtom);
  console.log(aproved);
  if (aproved!=="") {
    console.log(aproved, "data atom");
    const response = await fetch(baseUrl + `Investments/aproveInvestment?id=${aproved}`, {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
      },
      
    });
    if (response.ok) {
      toast.success("Aprobat cu succes");
    }
  }
});

export const investmentsAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(baseUrl + "Investments/getAllInvestment", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  return response.json();
});

export const pendingInvestmentsAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(baseUrl + "Investments/pendingInvestments", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  return response.json();
});

export const Logout = async () => {
  const response = await fetch(baseUrl + "Accounts/logout", {
    method: "POST",
    credentials: "include",
  });
  if (response.ok) {
    isLoggedAtom.init = false;
    window.location.href = "/";
    // gapi.auth.signOut();
  }
};

// export const TotalInvestmentsAtom = atom(async() =>{
//   const response = await fetch(baseUrl+ "Investments/totalInvestments", {
//     method: "GET",
//     credentials: "include",
//     headers: {
//       accept: "text/plain",
//     },
//   });

//     return response.json();

// });