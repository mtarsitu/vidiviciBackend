import { atom} from "jotai";

const entitiesUrl = `http://localhost:5000/getEntitiesByCategory?categoryId=`;
const categoriesUrl = `http://localhost:5000/GetAllEntityCategories`;
const allEntitiesUrl = `http://localhost:5000/getAllEntities`;
const entityInformationUrl = `http://localhost:5000/getEntityInformationByEntityId?id=`;
const buyTicketsUrl = `http://localhost:5000/GetBuyTickets`;
const sellTicketsUrl = `http://localhost:5000/GetSellTickets`;
const baseUrl = 'http://localhost:5241/';

const clientsCatId = "1";
const supplierCatId = "2";
const employeesCatId = "3";


export const isLoggedAtom = atom((false));
export const refreshAtom = atom(false);
export const entityIdAtom = atom("");

console.log(isLoggedAtom);

export const loggedUserAtom = atom(async () =>{
  const response = await fetch(baseUrl+'Accounts/currentUser',{
    method: "GET",
    credentials: "include",
    headers:{
      'accept': 'text/plain'
    }
  });
  return await response.json();
});


export const entitiesAtom = atom(async (get) => {
  get(refreshAtom);
  const response = await fetch(allEntitiesUrl, {
    method: "GET",
    headers: {
      Authorization: "dummy-tokens",

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
  const response = await fetch(entityInformationUrl + id);
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


export const Logout= async()=>{
  console.log("MERGE");
  await fetch("http://localhost:5000/logout",{
    method: "POST",
    credentials: "include",
  });
  window.location  ="/";

}