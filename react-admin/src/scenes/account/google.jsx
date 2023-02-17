import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { ExternalLoginAtom, userExternalAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
const Google = () => {
  const clientId =
    "990551574724-vuu0qq3193v2l5rgnndhnep4c6q7kcri.apps.googleusercontent.com";
  const [, setUserToLogin] = useAtom(userExternalAtom);
  useAtom(ExternalLoginAtom);
  const onSuccess = (res) => {
    console.log(res);
    const externalUser = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      usedPlatform: "google",
    };

    setUserToLogin(externalUser);
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
