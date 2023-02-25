import { atom } from "jotai";
import { toast } from "react-toastify";
export const baseUrl = "http://localhost:7204/";

export let isLoggedAtom = atom(false);
export const refreshAtom = atom(false);
export const refreshFundsAtom = atom(false);
export const entityIdAtom = atom("");
export const usernameAtom = atom("");

export const applicationUserIdAtom = atom("");
export const acceptPendingIdAtom = atom("");
export const deleteUserIdAtom = atom("");
export const notificationRefreshAtom = atom(false);
export const investmentAprovedAtom = atom("");

export const loggedUserAtom = atom(async (get) => {
  get(refreshAtom);
  return await requests.Get("Accounts/currentUser");
});

export const fundsAtom = atom(async (get) => {
  get(refreshFundsAtom);
  return await requests.Get("Funds/getAllPublic");
});

export const notificationsAtom = atom(async (get) => {
  get(notificationRefreshAtom);
  const user = get(loggedUserAtom);
  if (user !== null && user.userRole === "Admin") {
    return await requests.Get("Notifications/getAll");
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

export const allFundsAtom = atom(async (get) => {
  get(refreshFundsAtom);
  return await requests.Get("Funds/getAll");
});

export const myFundsAtom = atom(async (get) => {
  const name = get(usernameAtom);
  return await requests.Get(`Investments/UserAndInvestments?username=${name}`);
});

export const applicationAtom = atom(async (get) => {
  const id = get(applicationUserIdAtom);
  return await requests.Get(`Applications/get?clientId=${id}`);
});

export const documentsAtom = atom(async (get) => {
  const id = get(applicationUserIdAtom);
  return await requests.Get(`Applications/getDocuments?clientId=${id}`);
});

export const usersAtom = atom(async (get) => {
  get(refreshAtom);
  return await requests.Get("Admins/AllUser");
});

export const aproveInvestmentAtom = atom(async (get) => {
  const aproved = get(investmentAprovedAtom);
  console.log(aproved);
  if (aproved !== "") {
    console.log(aproved, "data atom");
    const response = await fetch(
      baseUrl + `Investments/aproveInvestment?id=${aproved}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "text/plain",
        },
      }
    );
    if (response.ok) {
      toast.success("Aprobat cu succes");
    }
  }
});

export const investmentsAtom = atom(async (get) => {
  get(refreshAtom);
  return await requests.Get("Investments/getAllInvestment");
});

export const pendingInvestmentsAtom = atom(async (get) => {
  get(refreshAtom);
  return await requests.Get("Investments/pendingInvestments");
});

export const requests = {
  Get: async (urlEnd) => {
    try {
      let response = await fetch(baseUrl + urlEnd, {
        method: "GET",
        credentials: "include",
      });
      return await responses(response);
    } catch (error) {
      console.log(error);
    }
  },
  Post: async (urlEnd,form) => {
    let response = await fetch(baseUrl + urlEnd, {
      method: "POST",
      credentials: "include",
      body:form
    });
    return response;
  },
};

const responses = async (response) => {

  if (response.ok) {
    return await response.json();
  }
  return null;
};
