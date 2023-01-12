import { atom } from "jotai";

const entitiesUrl = `http://localhost:5000/getEntitiesByCategory?categoryId=`;
const categoriesUrl = `http://localhost:5000/GetAllEntityCategories`;
const allEntitiesUrl = `http://localhost:5000/getAllEntities`;
const entityInformationUrl = `http://localhost:5000/getEntityInformationByEntityId?id=`;
const buyTicketsUrl = `http://localhost:5000/GetBuyTickets`;
const sellTicketsUrl = `http://localhost:5000/GetSellTickets`;
const baseUrl = "http://localhost:5241/";

const clientsCatId = "1";
const supplierCatId = "2";
const employeesCatId = "3";

export let isLoggedAtom = atom(false);
export const refreshAtom = atom(false);
export const entityIdAtom = atom("");
export const usernameAtom = atom("");
export const loggedUserAtom = atom(async () => {
  const response = await fetch(baseUrl + "Accounts/currentUser", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  if (response.ok) {
    isLoggedAtom.init = true;
    
    return await response.json();
  }
  return null;
});
console.log(loggedUserAtom)
export const fundsAtom = atom(async () => {
  
  const response = await fetch(baseUrl + "Funds/getAllPublic",{
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  if (response.ok){
    return await response.json();
  }
  return null;
});

export const myFundsAtom = atom(async ()=>{
  
  console.log(loggedUserAtom.response);
  const response = await fetch(baseUrl+"Accounts/UserAndInvestments?username="+"investor",{
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  if (response.ok){
    return await response.json();
  }
  return null;
})

export const entitiesAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(baseUrl + "Accounts/AllUser", {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  return await response.json();
});

export const clientsAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(entitiesUrl + clientsCatId);
  return await response.json();
});

export const suppliersAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(entitiesUrl + supplierCatId);
  return await response.json();
});

export const employees = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(entitiesUrl + employeesCatId);
  return await response.json();
});

export const categoriesAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(categoriesUrl);
  return await response.json();
});

export const entityInformationAtom = atom(async (get) => {
  const id = get(entityIdAtom);
  console.log(id);
  get(refreshAtom);
  const response = await fetch(baseUrl +"Informations/userInformations?id="+id,{
    method: "GET",
    credentials: "include",
    headers: {
      accept: "text/plain",
    },
  });
  return response.json();
});

export const buyTicketsAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(buyTicketsUrl);
  return response.json();
});

export const sellTicketsAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(sellTicketsUrl);
  return response.json();
});

export const Logout = async () => {
  const response = await fetch(baseUrl + "Accounts/logout", {
    method: "POST",
    credentials: "include",
  });
  if (response.ok) {
    isLoggedAtom.init = false;
    
    window.location = "/";
  }
};
