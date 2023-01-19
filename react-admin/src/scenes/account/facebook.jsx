import FacebookLogin from "react-facebook-login";
import styles from "./styles.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ExternalLoginAtom, userToLoginAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";

const Facebook = ()=>{
    const appId = "2097613670424852";
    const [,setUserToLogin] = useAtom(userToLoginAtom);
    const [ExternalLogin,] = useAtom(ExternalLoginAtom);

    const responseFacebook = (response) => {
        console.log(response);
        if (response) {
          const fullName = response.name.split(" ");
          const externalUser = {
            firstName: fullName[0],
            lastName: fullName[1],
            email: fullName[0] + "." + fullName[1] + "@testfacebook.com",
          };
          setUserToLogin(externalUser);
          ExternalLogin();
        }
      };


    return(
        <FacebookLogin
              appId= {appId}
              // autoLoad={true}
              textButton="Continua cu Facebook"
              // fields="name,email,picture"
              // onClick={componentClicked}
              cssClass={`${styles.facebook}`}
              callback={responseFacebook}
              icon={<FacebookIcon />}
              height="5"
            />
    );
};

export default Facebook;