import FacebookLogin from "react-facebook-login";
import styles from "./styles.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";


const Facebook = ()=>{
    const appId = "2097613670424852";
    // const [,setUserToLogin] = useAtom(userExternalAtom);
    // useAtom(ExternalLoginAtom);

    const responseFacebook = (response) => {
        console.log(response);
        if (response) {
          const fullName = response.name.split(" ");
          const externalUser = {
            firstName: fullName[0],
            lastName: fullName[1],
            email: fullName[0] + "." + fullName[1] + "@testfacebook.com",
            usedPlatform: "facebook"
          };
          // setUserToLogin(externalUser);
          
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