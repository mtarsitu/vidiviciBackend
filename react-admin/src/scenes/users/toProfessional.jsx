import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import { tokens } from "../../theme";
import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from "@mui/base/TextareaAutosize";
const ToProfesional = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const modalBackground = theme.palette.mode ? "dark" : "light";
  let [section, setSection] = useState(1);
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  let user = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  };
  // async function Register(formData) {
  //   user = {
  //     username: formData.get("username"),
  //     password: formData.get("password"),
  //     email: formData.get("email"),
  //     firstName: formData.get("firstName"),
  //     lastName: formData.get("lastName"),
  //   };
  //   const response = await fetch(`http://localhost:5241/Accounts/register`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       accept: "text/plain",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   });
  //   if (response.ok) {
  //     toast.success("Te-ai inregistrat cu succes!");
  //     const timeout = () => {
  //       setTimeout(() => {
  //         window.location.href = "/";
  //       }, 500);
  //     };
  //     timeout();
  //   }
  // }
  const handleNext = () => {
    setSection(section + 1);
  };
  console.log(section);
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    
    setSection(1);

    
  };

  return (
    <Box m="20px">
      <Header
        title="Devin-o investitor profesionist"
        subtitle="Depune o noua cerere"
      />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="-140px"
        >
          <img
            alt="profile-user"
            width="150%"
            height="150%"
            src={`../../../assets/vidivici-logo.png`}
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              marginTop: "-80px",
            }}
          />
        </Box>

        <Box
          sx={{
            marginTop: -10,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
          {section === 1 && (
            <>
              <Typography component="p">
                1. Cum poate fi caracterizata situatia dumneavoastra financiara
                din prezent:
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Nu am datorii;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am un credit ipotecar cu o rata rezonabila;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am doua sau mai multe credite ipotecare;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am doua sau mai multe credite ipotecare si alte datorii;
              "
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am alte datorii dar nu am credite ipotecare."
                />
              </FormGroup>
              <Typography component="p">
                2. Aveti in prezent si preconizati ca veti avea si in viitor un
                venit cert si sigur provenind de exemplu dintr-o activitate
                remunerata, din onorarii, din cedarea folosintei unor bunuri,
                din investitii, din pensii?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Nu am datorii;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="
              Da, am un venit cert si sigur;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Da, am un venit destul de cert si sigur;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am un venit oarecum cert si sigur;
              "
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Nu, nu am un venit cert si/sau sigur."
                />
              </FormGroup>
              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 2 && (
            <>
              <Typography component="p">
                3. Care este experienta dumneavoastra in realizarea de
                investitii in societatii de tip start-up-urilor si/sau societati
                care se afla intr-un stadiu incipient sau partial avansat de
                dezvoltare a activitatilor, inclusiv dar fara a se limita la
                dezvoltarea de produs(e)/serviciu(ii) de interes pentru
                realizarea unei investitii?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Posed experienta suficienta, cunosc elementele unei astfel de investitii, am capacitatea de a analiza si intelege pe deplin tipurile de activitati ale unor astfel de societatii precum si circumstantele care pot influenta in mod negativ investitiile in astfel de societati;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Posed experienta in materie investitionala in general, pot estima care sunt circumstantele ce pot conduce la cresterea, scaderea sau stagnarea unei investitii in astfel de societati precum si care ar putea fi performanta unei astfel de investii;
                  "
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Posed experienta limitata in materie investitionala, inclusiv in acest tip de societati, sunt oarecum la inceput de drum in materie de investitii; 
                  "
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Nu posed experienta in materie de investitii, este o prima experienta in acest domeniu in ceea ce ma priveste. 
                  "
                />
              </FormGroup>

              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 3 && (
            <>
              <Typography component="p">
                4. Cum este mai important pentru dumneavoastra certitudinea
                obtinerii unui profit in urma unei investitii, chiar daca
                profitul este modic sau angajarea unei investitii ce presupune
                obtinerea unui profit semnificativ insa nu foarte cert ca
                realizare?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Certitudinea obtinerii unui profit chiar daca este modic;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Obtinerea unui profit semnificativ desi nu foarte cert ca realizare;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Oricare dintre acestea;"
                />
              </FormGroup>
              <Typography component="p">
                5. Ce tip de investitie urmariti sa realizati?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="O investitie care sa imbunatateasca randamentul tuturor celorlalte investitii pe care le-am realizat si le realizez, fara sa conteze veniturile imediate pe care le-as obtine din aceasta investitie;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="O investitie cu un grad mai redus de expunere si care sa imi genereze un venit periodic;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="O investitie fara grad de expunere care imi genereaza un venit periodic;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="O investitie sigura care isi prezeva valoarea;"
                />
              </FormGroup>
              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 4 && (
            <>
              <Typography component="p">
                6. Cum credeti ca vi se potriveste urmatorul principiu
                investitional: imi asum un risc de investitie pe termen scurt
                anticipand realizarea unui profit considerabil pe termen lung?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mi se potriveste perfect;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mi se potriveste insa numai moderat;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Nu mi se potriveste;"
                />
                <FormControlLabel control={<Checkbox />} label="Nu stiu." />
              </FormGroup>
              <Typography component="p">
                7. Ce orizont de timp aveti in vedere pentru mentinerea unei
                investitii realizate? Ce interval de timp investitional aveti in
                vedere?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel control={<Checkbox />} label="6 ani;" />
                <FormControlLabel control={<Checkbox />} label="4 ani;" />
                <FormControlLabel control={<Checkbox />} label="3 ani;" />
                <FormControlLabel control={<Checkbox />} label="maxim 2 ani." />
              </FormGroup>
              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 5 && (
            <>
              <Typography component="p">
                8. Care ar fi masurile pe care le-ati adopta in cazul in care
                investitia pe care ati facut-o intr-o societate de tip start-up
                si/sau intr-o societate care se afla intr-un stadiu incipient
                sau partial avansat de dezvoltare a activitatilor, ar scadea
                intr-un an cu 20%?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Privesc scaderea ca pe o oportunitate si investesc suplimentar in respective societate;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Nu adopt nicio masura ci astept ca investitia sa isi revina in anul/anii urmatori, am incredere in activitatea si viitorul investitiei;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Lichidez partial investitia facuta pentru a minimiza pierderea;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Lichidez total investitia facuta pentru a recupera restul de 80% ramas din valoarea investita."
                />
              </FormGroup>
              <Typography component="p">
                9. Raspundeti urmatoarei afirmatii: Ma bazez pe _______
                (inserati procentul alegand din optiunile de mai jos) din sumele
                pe care intentionez sa le investesc in relatia cu Vidi Vici Afia
                srl, inclusiv castigurile generate din aceasta relatie, pentru a
                acoperi cheltuielile subsemnatului/subsemnatei din acest an:
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mai putin de 10%;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mai putin de 20%;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Intre 25% si 50%;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Mai mult de 50%"
                />
              </FormGroup>
              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 6 && (
            <>
              <Typography component="p">
                10. Ce tip de investitii ati realizat in trecut, in ce fel de
                produse, care este experienta dumneavoastra investitionala cu
                astfel de produse si care este gradul de cunoastere al
                riscurilor aferente acestor produse?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am investit in produse cu venit fix (e.g. obligatiuni, certificate de depozit);"
                />

                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Am o experienta de cu investitii in aceste produse
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="< 2 ani ;" />
                  <FormControlLabel control={<Checkbox />} label=" ≥ 2 ani" />
                </FormGroup>
                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Cunosc riscurile aferente acestor produse:
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="da ;" />
                  <FormControlLabel control={<Checkbox />} label="nu" />
                </FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am investit in actiuni ale unor emitenti listati pe piete de capital/sisteme alternative de tranzactionare;"
                />
                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Am o experienta de cu investitii in aceste produse
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="< 2 ani ;" />
                  <FormControlLabel control={<Checkbox />} label=" ≥ 2 ani" />
                </FormGroup>
                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Cunosc riscurile aferente acestor produse:
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="da ;" />
                  <FormControlLabel control={<Checkbox />} label="nu" />
                </FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am investit in instrumente financiare derivate tranzactionate public sau OTC;"
                />
                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Am o experienta de cu investitii in aceste produse
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="< 2 ani ;" />
                  <FormControlLabel control={<Checkbox />} label=" ≥ 2 ani" />
                </FormGroup>
                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Cunosc riscurile aferente acestor produse:
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="da ;" />
                  <FormControlLabel control={<Checkbox />} label="nu" />
                </FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Am investit in actiuni, parti sociale, parti de interes emise de societati inchise (nelistate) si a caror activitate era de tip start-up sau se afla intr-un stadiu incipient sau partial avansat de dezvoltare, avand produse/servicii atractive/innovative/de perspectiva pentru randamentul unei investitii;  "
                />
                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Am o experienta de cu investitii in aceste produse
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="< 2 ani ;" />
                  <FormControlLabel control={<Checkbox />} label=" ≥ 2 ani" />
                </FormGroup>
                <FormGroup sx={{ marginLeft: 5 }}>
                  <Typography component="p" sx={{ marginLeft: -2 }}>
                    Cunosc riscurile aferente acestor produse:
                  </Typography>
                  <FormControlLabel control={<Checkbox />} label="da ;" />
                  <FormControlLabel control={<Checkbox />} label="nu" />
                </FormGroup>
              </FormGroup>

              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 7 && (
            <>
              <Typography component="p">
                11. Cate tranzactii de investitii realizati in general in cursul
                unui an, indiferent ca este vorba despre investitii precum cele
                in produse cu venit fix, actiuni, unitati de fond, instrumente
                financiare derivate, actiuni/parti sociale/parti de interes in
                societati nelistate?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="20 sau mai multe;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 10 si 20;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="mai putin de 10;"
                />
                <FormControlLabel control={<Checkbox />} label="niciuna." />
              </FormGroup>
              <Typography component="p">
                12. Care este pentru dumneavoastra suma uzuala pe care o
                dedicati unei investitii obisnuite pe care o realizati?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="100.000 Euro sau mai mult;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 50.000 Euro si 100.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 30.000 Euro si 50.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 10.000 Euro si 30.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="mai putin de 10.000 de Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="nu am investit inca o anumita suma;"
                />
              </FormGroup>
              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 8 && (
            <>
              <Typography component="p">
                13. Care este dimensiunea valorica a portofoliului dumneavoastra
                de investitii, indiferent ca este vorba despre investitii precum
                cele in produse cu venit fix, actiuni, unitati de fond,
                instrumente financiare derivate, actiuni/parti sociale/parti de
                interes in societati nelistate, depozite bancare, bunuri
                imobile?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="500.000 Euro sau mai mult;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 50.000 Euro si 100.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 30.000 Euro si 50.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 10.000 Euro si 30.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="mai putin de 10.000 de Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="nu am inca un portofoliu de investitii."
                />
              </FormGroup>
              <Typography component="p">
                14. Ce suma sunteti dispus(a) sa investiti in actiuni, parti
                sociale, parti de interes emise de societati inchise (nelistate)
                si a caror activitate era de tip start-up sau se afla intr-un
                stadiu incipient sau partial avansat de dezvoltare, inclusiv dar
                fara a se limita la dezvoltarea unui/unor produs(e)/serviciu(ii)
                de interes pentru realizarea unei investitii?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="100.000 Euro sau mai mult;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 50.000 Euro si 100.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 30.000 Euro si 50.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="intre 10.000 Euro si 30.000 Euro;"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="mai putin de 10.000 de Euro;"
                />
              </FormGroup>
              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 9 && (
            <>
              <Typography component="p">
                15. Posedati experienta profesionala, prezenta sau trecuta, de
                cel putin 1 an in materie de investitii precum cele in produse
                cu venit fix, actiuni, unitati de fond, instrumente financiare
                derivate, actiuni/parti sociale/parti de interes in societati
                nelistate sau in sectorul financiar sau intr-o profesie
                reglementata (e.g. avocat, consultant financiar, contabil) care
                acorda incidental consultanta de investitii?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="da, posed o astfel de experienta profesionala sau ma pot califica drept investitor profesional intrucat activez / am activat in (a se descrie pe scurt, inclusiv activitati incidentale de acordare consultanta in investitii in baza unei profesii reglementate) "
                />

                <FormGroup sx={{ marginLeft: 5 }}>
                  <FormControlLabel control={<TextareaAutosize />} />
                </FormGroup>

                <FormControlLabel
                  control={<Checkbox />}
                  label="desi nu posed o astfel de experienta profesionala, consider ca pot fi calificat drept investitor profesional intrucat am urmat cursuri si studii profesionale in legatura cu investitii in produse cu venit fix, actiuni, unitati de fond, instrumente financiare derivate, actiuni/parti sociale/parti de interes in societati nelistate la (a se descrie pe scurt)"
                />
                <FormGroup sx={{ marginLeft: 5 }}>
                  <FormControlLabel control={<TextareaAutosize />} />
                </FormGroup>

                <FormControlLabel
                  control={<Checkbox />}
                  label="nu posed experienta profesionala in niciunul dintre domeniile mentionate."
                />
              </FormGroup>

              <Button
                onClick={handleNext}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Next
              </Button>
            </>
          )}
          {section === 10 && (
            <>
              <Typography component="p">
                16. Posedati experienta in mod particular in materie de
                investitii in societati nelistate de tip start-up si/sau
                societati care se afla intr-un stadiu incipient sau partial
                avansat de dezvoltare a activitatilor, inclusiv dar fara a se
                limita la dezvoltarea de produs(e)/serviciu(ii) de interes
                pentru realizarea unei investitii?
              </Typography>
              <FormGroup sx={{ marginLeft: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="da, posed o astfel de experienta intrucat investesc / am investit in (a se descrie pe scurt) "
                />

                <FormGroup sx={{ marginLeft: 5 }}>
                  <FormControlLabel control={<TextareaAutosize />} />
                </FormGroup>

                <FormControlLabel
                  control={<Checkbox />}
                  label={`desi nu posed o astfel de experienta, consider ca pot fi calificat drept investitor profesional intrucat, in exercitarea profesiei de (a se insera), am desfasurat activitati de consultanta / asistenta tehnica/operationala in legatura cu astfel de investitii in in societati nelistate de tip start-up si/sau care se afla intr-un stadiu incipient sau partial avansat de dezvoltare a activitatilor, inclusiv dar fara a se limita la dezvoltarea unui/unor produs(e)/serviciu(ii) de interes pentru realizarea unei investitie in sensul ca (a se insera pe scurt tipul de activitati si detalii despre investitii)`}
                />
                <FormGroup sx={{ marginLeft: 5 }}>
                  <FormControlLabel control={<TextareaAutosize />} />
                  <Typography component="p">introdu profesia</Typography>
                  <FormControlLabel control={<TextareaAutosize />} />
                </FormGroup>

                <FormControlLabel
                  control={<Checkbox />}
                  label="nu posed experienta profesionala in niciunul dintre domeniile mentionate."
                />
              </FormGroup>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: `neutral.main` }}
              >
                Inregistreaza formular
              </Button>
            </>
          )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ToProfesional;
