import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { ExternalLoginAtom, userToLoginAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
const Google = () => {
    const clientId =
    "968260556925-a1kdrj4op5s1j2981l3lent1kg397j83.apps.googleusercontent.com";
  const [,setUserToLogin] = useAtom(userToLoginAtom);
 const [ExternalLogin,] = useAtom(ExternalLoginAtom);
  const onSuccess = (res) => {
    console.log(res);
    const externalUser = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      usedPlatform: "google"
    };

    setUserToLogin(externalUser);
    ExternalLogin();
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Continua cu Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      // isSignedIn={true}
    />
  );
};

export default Google;
