import { atom } from "jotai";
import { toast } from "react-toastify";

const baseUrl = "https://vidivici.azurewebsites.net/Events/";

export const newEventAtom = atom("");
export const refreshEventsAtom = atom(false);

export const eventsAtom = atom(async (get) => {
  get(refreshEventsAtom);
  const response = await fetch(baseUrl + "getAll", {
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

export const AddNewEventAtom = atom(async (get) => {
  let event = get(newEventAtom);
  if (Object.keys(event).length !== 0) {
    const response = await fetch(baseUrl + "add", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (response.ok) {
      toast.success("Eveniment adaugat cu succes");
      return response.ok;
    }
    return toast.error("Nu a fost adaugat evenimentul");
  }
});
