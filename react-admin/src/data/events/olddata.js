// export const userToLoginAtom = atom({});
// export const newFondAtom = atom("");
// export const newInformationAtom = atom("");
// export const newApplicationAtom = atom("");
// export const userExternalAtom = atom("");

// export const RegisterApplicationAtom = atom(async (get) => {
//   const application = get(newApplicationAtom);
//   if (Object.keys(application).length !== 0) {
//     const response = await fetch(baseUrl + "Applications/add", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         accept: "text/plain",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(application),
//     });
//     if (response.ok) {
//       toast.success("Inregistrare adaugata cu succes");
//       return response.ok;
//     }
//     return console.error("Nu a fost adaugata aplicatia");
//   }
// });

// export const RegisterFundAtom = atom(async (get) => {
//   const fond = get(newFondAtom);
//   if (Object.keys(fond).length !== 0) {
//     const response = await fetch(baseUrl + `Funds/addFund`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         accept: "text/plain",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(fond),
//     });
//     if (response.ok) {
//       toast.success("Fond adaugat cu succes");
//       return response.ok;
//     }
//     return console.error("Nu a fost adaugat fondul");
//   }
// });

// export const RegisterInformationAtom = atom(async (get) => {
//   const info = get(newInformationAtom);

//   if (Object.keys(info).length !== 0) {
//     const response = await fetch(baseUrl + "Informations/addInformation", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         accept: "text/plain",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(info),
//     });

//     if (response.ok) {
//       toast.success("Informatie adaugata cu succes");

//       return response.ok;
//     }
//     return console.error("Informatia nu a fost adaugata");
//   }
// });

// export const LogInAtom = atom(async (get) => {
//   const userToLogin = get(userToLoginAtom);
//   if (Object.keys(userToLogin).length !== 0) {
//     let response = await fetch(`https://vidivici.azurewebsites.net/Accounts/login`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         accept: "text/plain",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userToLogin),
//     });
//     if (Object.keys(userToLogin).length !== 0) {
//       if (response.ok) {
//         toast.success(`${userToLogin.username} Te-ai logat cu succes!`);
//         const timeout = () => {
//           setTimeout(() => {
//             window.location.href = "/dashboard";
//           }, 1000);
//         };
//         timeout();
//         return response.ok;
//       } else {
//         toast.warning("Username sau parola gresita aici");
//       }
//     }
//   }
// });


// export const ExternalLoginAtom = atom(async (get) => {
//   const userToLogin = get(userExternalAtom);
//   if (Object.keys(userToLogin).length !== 0) {
//     let response = await fetch(`https://vidivici.azurewebsites.net/Accounts/external`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         accept: "text/plain",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userToLogin),
//     });

//     if (response.ok) {
//       toast.success(`${userToLogin.firstName} Te-ai logat cu succes!`);
//       const timeout = () => {
//         setTimeout(() => {
//           window.location.href = "/dashboard";
//         }, 500);
//       };
//       timeout();
//       return response.ok;
//     } else {
//       toast.warning("Username sau parola gresita");
//     }
//   }
// });


// export const Logout = async () => {
//   const response = await fetch(baseUrl + "Accounts/logout", {
//     method: "POST",
//     credentials: "include",
//   });
//   if (response.ok) {
//     isLoggedAtom.init = false;
//     window.location.href = "/";
//     // gapi.auth.signOut();
//   }
// };

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