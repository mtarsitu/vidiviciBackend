import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Unauthorize({ errorMessage }) {
  const message = errorMessage;
  return (
    <div>
      {toast.error(message)}
    </div>
  );
}
