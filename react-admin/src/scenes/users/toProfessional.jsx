import * as React from "react";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import formObject from "../../data/questions";
import AddInformation from "../information/addInformation";
import { newApplicationAtom, RegisterApplicationAtom } from "../../data/dataAtom";
import { useAtom } from "jotai";
const pdf = new jsPDF();
const imageObject = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
};

const ToProfesional = ({ show, setShow, user, mode, colors }) => {
  const date = new Date();
  const [,setNewApplication] = useAtom(newApplicationAtom);
  const RegisterApplication = useAtom(RegisterApplicationAtom);

  let [section, setSection] = useState(1);
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [newInformation, setNewInformation] = useState(true);
  const handleCloseModal = () => {
    setShow(false);
  };
  console.log(user.id);
  const handleNext = () => {
    addImageProcess();
    section != Object.keys(imageObject).length
      ? setSection(section + 1)
      : setShow(false);
  };

  const handleFormObject = (e) => {
    const idList = e.target.id.split("-");
    const checkbox = parseInt(idList[1]);
    const question = parseInt(idList[0]);
    if (idList.length == 2) {
      formObject[question][checkbox] = e.target.checked;
    } else {
      const secondCheckBox = parseInt(idList[2]);
      formObject[question][checkbox][secondCheckBox] = e.target.checked;
    }
  };
  const handleTextarea = (e) => {
    const idList = e.target.id.split("-");
    const checkbox = parseInt(idList[1]);
    const question = parseInt(idList[0]);
    const secondCheckBox = parseInt(idList[2]);
    formObject[question][checkbox][secondCheckBox] = e.target.value;
  };
  const addImageProcess = () => {
    const input = document.querySelector("#divToPrint");
    html2canvas(input, {
      scale: 0.9,
    })
      .then(async (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        imageObject[section] = imgData;
      })
      .then(async () => {
        if (
          Object.values(imageObject).filter((x) => !!x).length ===
          Object.keys(imageObject).length
        ) {
          setNewApplication({clientId:user.id,applicationObject:JSON.stringify(formObject)});
          await generatePdf();
          pdf.save("vidvici-chestionar.pdf");

          setShow(false);
          setSection(0);
        }
      });
  };

  const generatePdf = async () => {
    for (const [i, img] of Object.entries(imageObject)) {
      pdf.addImage(img, "pdf", -5, 5, 180, 0);

      if (i !== Object.entries(imageObject).length - 1) {
        pdf.addPage();
      }
    }
  };

  return (
    <>
      {show && (
        <>
          {section === 1 && newInformation &&(
            <AddInformation
              show={newInformation}
              setShow={setNewInformation}
              userId={user.id}
              mode={mode}
              colors={colors}
            />
          )}
          {!newInformation && (
            <Modal
              open={show}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ overflow: "scroll" }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "60%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80vw",
                  bgcolor: `${
                    mode === "light" ? colors.primary[900] : colors.primary[600]
                  }`,
                  border: "2px solid #000",
                  boxShadow: 24,
                  borderRadius: "12px",
                  p: 4,
                }}
              >
                <Box m="20px" id={"divToPrint"}>
                  <Container component="main" maxWidth="s">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      marginTop="-40px"
                    >
                      {mode === "dark" ? (
                        <img
                          alt="profile-user"
                          width="30%"
                          height="30%"
                          src={`../../../assets/vidivici-logo.png`}
                          style={{
                            cursor: "pointer",
                            borderRadius: "30%",
                            marginTop: "-40px",
                          }}
                        />
                      ) : (
                        <img
                          alt="profile-user"
                          width="30%"
                          height="30%"
                          src={`../../../assets/logo-inchis.png`}
                          style={{
                            cursor: "pointer",
                            borderRadius: "50%",
                            marginTop: "-40px",
                          }}
                        />
                      )}
                    </Box>
                    <CssBaseline />

                    <Box
                      sx={{
                        marginTop: -5,
                        marginLeft: 25,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        maxWidth: "50vw",
                      }}
                    >
                      <Box component="form" noValidate sx={{ mt: 1 }}>
                        {/* <div className="mb5">
                          <button onClick={addImageProcess}>Print</button>
                        </div> */}
                        {section === 1 && (
                          <>
                            <Typography component="p">
                              1. Cum poate fi caracterizata situatia
                              dumneavoastra financiara din prezent:
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="1-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Nu am datorii;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="1-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am un credit ipotecar cu o rata rezonabila;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="1-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am doua sau mai multe credite ipotecare;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="1-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am doua sau mai multe credite ipotecare si alte datorii"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="1-5"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am alte datorii dar nu am credite ipotecare."
                              />
                            </FormGroup>
                            <Typography component="p">
                              2. Aveti in prezent si preconizati ca veti avea si
                              in viitor un venit cert si sigur provenind de
                              exemplu dintr-o activitate remunerata, din
                              onorarii, din cedarea folosintei unor bunuri, din
                              investitii, din pensii?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="2-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Nu am datorii;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="2-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Da, am un venit cert si sigur;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="2-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Da, am un venit destul de cert si sigur;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="2-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am un venit oarecum cert si sigur;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="2-5"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Nu, nu am un venit cert si/sau sigur."
                              />
                            </FormGroup>
                            <Typography component="p">
                              3. Care este experienta dumneavoastra in
                              realizarea de investitii in societatii de tip
                              start-up-urilor si/sau societati care se afla
                              intr-un stadiu incipient sau partial avansat de
                              dezvoltare a activitatilor, inclusiv dar fara a se
                              limita la dezvoltarea de produs(e)/serviciu(ii) de
                              interes pentru realizarea unei investitii?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="3-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Posed experienta suficienta, cunosc elementele unei astfel de investitii, am capacitatea de a analiza si intelege pe deplin tipurile de activitati ale unor astfel de societatii precum si circumstantele care pot influenta in mod negativ investitiile in astfel de societati;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="3-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Posed experienta in materie investitionala in general, pot estima care sunt circumstantele ce pot conduce la cresterea, scaderea sau stagnarea unei investitii in astfel de societati precum si care ar putea fi performanta unei astfel de investii;
                  "
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="3-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Posed experienta limitata in materie investitionala, inclusiv in acest tip de societati, sunt oarecum la inceput de drum in materie de investitii; 
                  "
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="3-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Nu posed experienta in materie de investitii, este o prima experienta in acest domeniu in ceea ce ma priveste. 
                  "
                              />
                            </FormGroup>
                            <Typography component="p">
                              4. Cum este mai important pentru dumneavoastra
                              certitudinea obtinerii unui profit in urma unei
                              investitii, chiar daca profitul este modic sau
                              angajarea unei investitii ce presupune obtinerea
                              unui profit semnificativ insa nu foarte cert ca
                              realizare?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="4-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Certitudinea obtinerii unui profit chiar daca este modic;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="4-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Obtinerea unui profit semnificativ desi nu foarte cert ca realizare;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="4-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Oricare dintre acestea;"
                              />
                            </FormGroup>
                          </>
                        )}

                        {section === 2 && (
                          <>
                            <Typography component="p">
                              5. Ce tip de investitie urmariti sa realizati?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="5-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="O investitie care sa imbunatateasca randamentul tuturor celorlalte investitii pe care le-am realizat si le realizez, fara sa conteze veniturile imediate pe care le-as obtine din aceasta investitie;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="5-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="O investitie cu un grad mai redus de expunere si care sa imi genereze un venit periodic;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="5-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="O investitie fara grad de expunere care imi genereaza un venit periodic;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="5-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="O investitie sigura care isi prezeva valoarea;"
                              />
                            </FormGroup>
                            <Typography component="p">
                              6. Cum credeti ca vi se potriveste urmatorul
                              principiu investitional: imi asum un risc de
                              investitie pe termen scurt anticipand realizarea
                              unui profit considerabil pe termen lung?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="6-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Mi se potriveste perfect;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="6-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Mi se potriveste insa numai moderat;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="6-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Nu mi se potriveste;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="6-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Nu stiu."
                              />
                            </FormGroup>
                            <Typography component="p">
                              7. Ce orizont de timp aveti in vedere pentru
                              mentinerea unei investitii realizate? Ce interval
                              de timp investitional aveti in vedere?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="7-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="6 ani;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="7-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="4 ani;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="7-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="3 ani;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="7-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="maxim 2 ani."
                              />
                            </FormGroup>
                            <Typography component="p">
                              8. Care ar fi masurile pe care le-ati adopta in
                              cazul in care investitia pe care ati facut-o
                              intr-o societate de tip start-up si/sau intr-o
                              societate care se afla intr-un stadiu incipient
                              sau partial avansat de dezvoltare a activitatilor,
                              ar scadea intr-un an cu 20%?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="8-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Privesc scaderea ca pe o oportunitate si investesc suplimentar in respective societate;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="8-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Nu adopt nicio masura ci astept ca investitia sa isi revina in anul/anii urmatori, am incredere in activitatea si viitorul investitiei;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="8-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Lichidez partial investitia facuta pentru a minimiza pierderea;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="8-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Lichidez total investitia facuta pentru a recupera restul de 80% ramas din valoarea investita."
                              />
                            </FormGroup>
                            <Typography component="p">
                              9. Raspundeti urmatoarei afirmatii: Ma bazez pe
                              _______ (inserati procentul alegand din optiunile
                              de mai jos) din sumele pe care intentionez sa le
                              investesc in relatia cu Vidi Vici Afia srl,
                              inclusiv castigurile generate din aceasta relatie,
                              pentru a acoperi cheltuielile
                              subsemnatului/subsemnatei din acest an:
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="9-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Mai putin de 10%;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="9-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Mai putin de 20%;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="9-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Intre 25% si 50%;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="9-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Mai mult de 50%"
                              />
                            </FormGroup>
                          </>
                        )}

                        {section === 3 && (
                          <>
                            <Typography component="p">
                              10. Ce tip de investitii ati realizat in trecut,
                              in ce fel de produse, care este experienta
                              dumneavoastra investitionala cu astfel de produse
                              si care este gradul de cunoastere al riscurilor
                              aferente acestor produse?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="10-1-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am investit in produse cu venit fix (e.g. obligatiuni, certificate de depozit);"
                              />

                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Am o experienta de cu investitii in aceste
                                  produse:
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-1-2"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="< 2 ani ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-1-3"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label=" ≥ 2 ani"
                                />
                              </FormGroup>
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Cunosc riscurile aferente acestor produse:
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-1-4"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="da ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-1-5"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="nu"
                                />
                              </FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="10-2-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am investit in actiuni ale unor emitenti listati pe piete de capital/sisteme alternative de tranzactionare;"
                              />
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Am o experienta de cu investitii in aceste
                                  produse
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-2-2"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="< 2 ani ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-2-3"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label=" ≥ 2 ani"
                                />
                              </FormGroup>
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Cunosc riscurile aferente acestor produse:
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-2-4"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="da ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-2-5"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="nu"
                                />
                              </FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="10-3-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am investit in instrumente financiare derivate tranzactionate public sau OTC;"
                              />
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Am o experienta de cu investitii in aceste
                                  produse
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-3-2"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="< 2 ani ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-3-3"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label=" ≥ 2 ani"
                                />
                              </FormGroup>
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Cunosc riscurile aferente acestor produse:
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-3-4"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="da ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-3-5"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="nu"
                                />
                              </FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="10-4-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="Am investit in actiuni, parti sociale, parti de interes emise de societati inchise (nelistate) si a caror activitate era de tip start-up sau se afla intr-un stadiu incipient sau partial avansat de dezvoltare, avand produse/servicii atractive/innovative/de perspectiva pentru randamentul unei investitii;  "
                              />
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Am o experienta de cu investitii in aceste
                                  produse
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-4-2"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="< 2 ani ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-4-3"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label=" ≥ 2 ani"
                                />
                              </FormGroup>
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <Typography
                                  component="p"
                                  sx={{ marginLeft: -2 }}
                                >
                                  Cunosc riscurile aferente acestor produse:
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-4-4"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="da ;"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      id="10-4-5"
                                      onClick={handleFormObject}
                                    />
                                  }
                                  label="nu"
                                />
                              </FormGroup>
                            </FormGroup>
                          </>
                        )}
                        {section === 4 && (
                          <>
                            <Typography component="p">
                              11. Cate tranzactii de investitii realizati in
                              general in cursul unui an, indiferent ca este
                              vorba despre investitii precum cele in produse cu
                              venit fix, actiuni, unitati de fond, instrumente
                              financiare derivate, actiuni/parti sociale/parti
                              de interes in societati nelistate?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="11-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="20 sau mai multe;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="11-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 10 si 20;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="11-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="mai putin de 10;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="11-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="niciuna."
                              />
                            </FormGroup>
                            <Typography component="p">
                              12. Care este pentru dumneavoastra suma uzuala pe
                              care o dedicati unei investitii obisnuite pe care
                              o realizati?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="12-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="100.000 Euro sau mai mult;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="12-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 50.000 Euro si 100.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="12-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 30.000 Euro si 50.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="12-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 10.000 Euro si 30.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="12-5"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="mai putin de 10.000 de Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="12-6"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="nu am investit inca o anumita suma;"
                              />
                            </FormGroup>
                            <Typography component="p">
                              13. Care este dimensiunea valorica a portofoliului
                              dumneavoastra de investitii, indiferent ca este
                              vorba despre investitii precum cele in produse cu
                              venit fix, actiuni, unitati de fond, instrumente
                              financiare derivate, actiuni/parti sociale/parti
                              de interes in societati nelistate, depozite
                              bancare, bunuri imobile?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="13-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="500.000 Euro sau mai mult;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="13-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 50.000 Euro si 100.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="13-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 30.000 Euro si 50.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="13-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 10.000 Euro si 30.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="13-5"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="mai putin de 10.000 de Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="13-6"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="nu am inca un portofoliu de investitii."
                              />
                            </FormGroup>
                            <Typography component="p">
                              14. Ce suma sunteti dispus(a) sa investiti in
                              actiuni, parti sociale, parti de interes emise de
                              societati inchise (nelistate) si a caror
                              activitate era de tip start-up sau se afla intr-un
                              stadiu incipient sau partial avansat de
                              dezvoltare, inclusiv dar fara a se limita la
                              dezvoltarea unui/unor produs(e)/serviciu(ii) de
                              interes pentru realizarea unei investitii?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="14-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="100.000 Euro sau mai mult;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="14-2"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 50.000 Euro si 100.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="14-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 30.000 Euro si 50.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="14-4"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="intre 10.000 Euro si 30.000 Euro;"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="14-5"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="mai putin de 10.000 de Euro;"
                              />
                            </FormGroup>
                          </>
                        )}

                        {section === 5 && (
                          <>
                            <Typography component="p">
                              15. Posedati experienta profesionala, prezenta sau
                              trecuta, de cel putin 1 an in materie de
                              investitii precum cele in produse cu venit fix,
                              actiuni, unitati de fond, instrumente financiare
                              derivate, actiuni/parti sociale/parti de interes
                              in societati nelistate sau in sectorul financiar
                              sau intr-o profesie reglementata (e.g. avocat,
                              consultant financiar, contabil) care acorda
                              incidental consultanta de investitii?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="15-1-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="da, posed o astfel de experienta profesionala sau ma pot califica drept investitor profesional intrucat activez / am activat in (a se descrie pe scurt, inclusiv activitati incidentale de acordare consultanta in investitii in baza unei profesii reglementate) "
                              />

                              <FormGroup sx={{ marginLeft: 5 }}>
                                <FormControlLabel
                                  control={
                                    <TextareaAutosize
                                      id="15-1-2"
                                      onChange={handleTextarea}
                                    />
                                  }
                                />
                              </FormGroup>

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="15-2-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="desi nu posed o astfel de experienta profesionala, consider ca pot fi calificat drept investitor profesional intrucat am urmat cursuri si studii profesionale in legatura cu investitii in produse cu venit fix, actiuni, unitati de fond, instrumente financiare derivate, actiuni/parti sociale/parti de interes in societati nelistate la (a se descrie pe scurt)"
                              />
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <FormControlLabel
                                  control={
                                    <TextareaAutosize
                                      id="15-2-2"
                                      onChange={handleTextarea}
                                    />
                                  }
                                />
                              </FormGroup>

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="15-3"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="nu posed experienta profesionala in niciunul dintre domeniile mentionate."
                              />
                            </FormGroup>
                            <Typography component="p">
                              16. Posedati experienta in mod particular in
                              materie de investitii in societati nelistate de
                              tip start-up si/sau societati care se afla intr-un
                              stadiu incipient sau partial avansat de dezvoltare
                              a activitatilor, inclusiv dar fara a se limita la
                              dezvoltarea de produs(e)/serviciu(ii) de interes
                              pentru realizarea unei investitii?
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="16-1-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label="da, posed o astfel de experienta intrucat investesc / am investit in (a se descrie pe scurt) "
                              />

                              <FormGroup sx={{ marginLeft: 5 }}>
                                <FormControlLabel
                                  control={
                                    <TextareaAutosize
                                      id="16-1-2"
                                      onChange={handleTextarea}
                                    />
                                  }
                                />
                              </FormGroup>

                              <FormControlLabel
                                control={
                                  <Checkbox
                                    id="16-2-1"
                                    onClick={handleFormObject}
                                  />
                                }
                                label={`desi nu posed o astfel de experienta, consider ca pot fi calificat drept investitor profesional intrucat, in exercitarea profesiei de (a se insera), am desfasurat activitati de consultanta / asistenta tehnica/operationala in legatura cu astfel de investitii in in societati nelistate de tip start-up si/sau care se afla intr-un stadiu incipient sau partial avansat de dezvoltare a activitatilor, inclusiv dar fara a se limita la dezvoltarea unui/unor produs(e)/serviciu(ii) de interes pentru realizarea unei investitie in sensul ca (a se insera pe scurt tipul de activitati si detalii despre investitii)`}
                              />
                              <FormGroup sx={{ marginLeft: 5 }}>
                                <FormControlLabel
                                  control={
                                    <TextareaAutosize
                                      id="16-2-2"
                                      onChange={handleTextarea}
                                    />
                                  }
                                />
                                <Typography component="p">
                                  introdu profesia
                                </Typography>
                                <FormControlLabel
                                  control={
                                    <TextareaAutosize
                                      id="16-2-3"
                                      onChange={handleTextarea}
                                    />
                                  }
                                />
                              </FormGroup>

                              <FormControlLabel
                                control={<Checkbox />}
                                label="nu posed experienta profesionala in niciunul dintre domeniile mentionate."
                              />
                            </FormGroup>
                            <Box m="20px">
                              <Typography component="h1" variant="h5">
                                Subsemnatul {user.firstName}-{user.lastName}
                              </Typography>
                              <Typography component="h1" variant="h5">
                                Data: {date.getDate()}-{date.getMonth() + 1}-
                                {date.getFullYear()}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Container>
                </Box>
                <Button
                  onClick={handleNext}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: `neutral.main`,
                  }}
                >
                  {section !== 5 ? "Urmatorul pas" : "Inregistreaza formular"}
                </Button>
              </Box>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default ToProfesional;
