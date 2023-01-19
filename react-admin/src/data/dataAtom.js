import { atom } from "jotai";
import { useGoogleLogout } from "react-google-login";
import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import { gapi } from "gapi-script";
const baseUrl = "http://localhost:5241/";

export let isLoggedAtom = atom(false);
export const refreshAtom = atom(false);
export const entityIdAtom = atom("");
export const usernameAtom = atom("");
export const userToLoginAtom = atom({});
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
    isLoggedAtom.init = true;
    // username = response.header
    // console.log(response.json());
    return await response.json();
  }
  // console.log(response);
  // toast.error("Error")
  return null;
});

export const fundsAtom = atom(async () => {
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
export const ExternalLoginAtom = atom(async (get) => {
  const userToLogin = get(userToLoginAtom);
  console.log(userToLogin);
  let response = await fetch(`http://localhost:5241/Accounts/external`, {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userToLogin),
  });
  if (Object.keys(userToLogin).length != 0) {
    if (response.ok) {
      toast.success(`${userToLoginAtom.username} Te-ai logat cu succes!`);
      const timeout = () => {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      };
      timeout();
      return response.ok;
    } else {
      toast.warning("Username sau parola gresita");
    }
  }
});

export const LogInAtom = atom(async (get) => {
  const userToLogin = get(userToLoginAtom);
  let response = await fetch(`http://localhost:5241/Accounts/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userToLogin),
  });
  if (Object.keys(userToLogin).length != 0) {
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
      toast.warning("Username sau parola gresita");
    }
  }
});

export const allFundsAtom = atom(async () => {
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

export const myFundsAtom = atom(async () => {
  console.log(usernameAtom);
  const response = await fetch(
    baseUrl + "Admins/UserAndInvestments?username=" + usernameAtom,
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
  console.log(id);
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

export const investmentsAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(baseUrl + "Investments/getAllInvestment", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  console.log(response);
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
