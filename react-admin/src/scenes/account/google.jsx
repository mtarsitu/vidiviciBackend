import { UserAuth } from "../../data/AuthContext";
import { GoogleButton } from "react-google-button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { refreshAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
const Google = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useAtom(refreshAtom);
  // console.log(user);
  const signIn = async () => {
    let response = await fetch(
      `https://vidivici.azurewebsites.net/Accounts/external`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
          email: user.email,
          usedPlatform: "Google"
        }),
      }
    );

    if (response.ok) {
      setRefresh(!refresh);
      toast.success(`${user.displayName} Te-ai logat cu succes!`);
      navigate("/dashboard");
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      let result = await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      signIn();
    }
  }, [user]);
  return (
    <>
      <GoogleButton onClick={handleGoogleSignIn} />
    </>
  );
};

export default Google;
