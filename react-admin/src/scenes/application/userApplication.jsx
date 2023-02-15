import { applicationAtom } from "../../data/dataAtom";
import {
  Box,
  FormControlLabel,
  CssBaseline,
  Typography,
  Checkbox,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useAtom } from "jotai";
import Header from "../../components/Header";
const UserApplication = ({ handleClose, user, mode, colors }) => {
  const application = useAtom(applicationAtom)[0];
  const applicationAnswer = JSON.parse(application.applicationObject);

  const close = () => {
    handleClose(false);
  };
  return (
    <>
      <CssBaseline />
      <Box m="10px" backgroundColor={colors.primary[400]} sx={{maxHeight:"55vh"}}>
        <Header title="Chestionar" />
        <Box
          sx={{
            // marginTop: 10,
            marginLeft: 5,
            maxWidth: "40vw",
            maxHeight: "85%",
            overflow: "scroll",
          }}
        >
          <Typography component="p">
            1. Cum poate fi caracterizata situatia dumneavoastra financiara din
            prezent:
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="1-1" disabled checked={applicationAnswer[1][1]} />
            }
            label="Nu am datorii;"
          />
          <FormControlLabel
            control={
              <Checkbox id="1-2" disabled checked={applicationAnswer[1][2]} />
            }
            label="Am un credit ipotecar cu o rata rezonabila;"
          />
          <FormControlLabel
            control={
              <Checkbox id="1-3" disabled checked={applicationAnswer[1][3]} />
            }
            label="Am doua sau mai multe credite ipotecare;"
          />
          <FormControlLabel
            control={
              <Checkbox id="1-4" disabled checked={applicationAnswer[1][4]} />
            }
            label="Am doua sau mai multe credite ipotecare si alte datorii"
          />
          <FormControlLabel
            control={
              <Checkbox id="1-5" disabled checked={applicationAnswer[1][5]} />
            }
            label="Am alte datorii dar nu am credite ipotecare."
          />

          <Typography component="p">
            2. Aveti in prezent si preconizati ca veti avea si in viitor un
            venit cert si sigur provenind de exemplu dintr-o activitate
            remunerata, din onorarii, din cedarea folosintei unor bunuri, din
            investitii, din pensii?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="2-1" disabled checked={applicationAnswer[2][1]} />
            }
            label="Nu am datorii;"
          />
          <FormControlLabel
            control={
              <Checkbox id="2-2" disabled checked={applicationAnswer[2][2]} />
            }
            label="Da, am un venit cert si sigur;"
          />
          <FormControlLabel
            control={
              <Checkbox id="2-3" disabled checked={applicationAnswer[2][3]} />
            }
            label="Da, am un venit destul de cert si sigur;"
          />
          <FormControlLabel
            control={
              <Checkbox id="2-4" disabled checked={applicationAnswer[2][4]} />
            }
            label="Am un venit oarecum cert si sigur;"
          />
          <FormControlLabel
            control={
              <Checkbox id="2-5" disabled checked={applicationAnswer[2][5]} />
            }
            label="Nu, nu am un venit cert si/sau sigur."
          />

          <Typography component="p">
            3. Care este experienta dumneavoastra in realizarea de investitii in
            societatii de tip start-up-urilor si/sau societati care se afla
            intr-un stadiu incipient sau partial avansat de dezvoltare a
            activitatilor, inclusiv dar fara a se limita la dezvoltarea de
            produs(e)/serviciu(ii) de interes pentru realizarea unei investitii?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="3-1" disabled checked={applicationAnswer[3][1]} />
            }
            label="Posed experienta suficienta, cunosc elementele unei astfel de investitii, am capacitatea de a analiza si intelege pe deplin tipurile de activitati ale unor astfel de societatii precum si circumstantele care pot influenta in mod negativ investitiile in astfel de societati;"
          />
          <FormControlLabel
            control={
              <Checkbox id="3-2" disabled checked={applicationAnswer[3][2]} />
            }
            label="Posed experienta in materie investitionala in general, pot estima care sunt circumstantele ce pot conduce la cresterea, scaderea sau stagnarea unei investitii in astfel de societati precum si care ar putea fi performanta unei astfel de investii;
                      "
          />
          <FormControlLabel
            control={
              <Checkbox id="3-3" disabled checked={applicationAnswer[3][3]} />
            }
            label="Posed experienta limitata in materie investitionala, inclusiv in acest tip de societati, sunt oarecum la inceput de drum in materie de investitii; 
                      "
          />
          <FormControlLabel
            control={
              <Checkbox id="3-4" disabled checked={applicationAnswer[3][4]} />
            }
            label="Nu posed experienta in materie de investitii, este o prima experienta in acest domeniu in ceea ce ma priveste. 
                      "
          />

          <Typography component="p">
            4. Cum este mai important pentru dumneavoastra certitudinea
            obtinerii unui profit in urma unei investitii, chiar daca profitul
            este modic sau angajarea unei investitii ce presupune obtinerea unui
            profit semnificativ insa nu foarte cert ca realizare?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="4-1" disabled checked={applicationAnswer[4][1]} />
            }
            label="Certitudinea obtinerii unui profit chiar daca este modic;"
          />
          <FormControlLabel
            control={
              <Checkbox id="4-2" disabled checked={applicationAnswer[4][2]} />
            }
            label="Obtinerea unui profit semnificativ desi nu foarte cert ca realizare;"
          />
          <FormControlLabel
            control={
              <Checkbox id="4-3" disabled checked={applicationAnswer[4][3]} />
            }
            label="Oricare dintre acestea;"
          />

          <Typography component="p">
            5. Ce tip de investitie urmariti sa realizati?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="5-1" disabled checked={applicationAnswer[5][1]} />
            }
            label="O investitie care sa imbunatateasca randamentul tuturor celorlalte investitii pe care le-am realizat si le realizez, fara sa conteze veniturile imediate pe care le-as obtine din aceasta investitie;"
          />
          <FormControlLabel
            control={
              <Checkbox id="5-2" disabled checked={applicationAnswer[5][2]} />
            }
            label="O investitie cu un grad mai redus de expunere si care sa imi genereze un venit periodic;"
          />
          <FormControlLabel
            control={
              <Checkbox id="5-3" disabled checked={applicationAnswer[5][3]} />
            }
            label="O investitie fara grad de expunere care imi genereaza un venit periodic;"
          />
          <FormControlLabel
            control={
              <Checkbox id="5-4" disabled checked={applicationAnswer[5][4]} />
            }
            label="O investitie sigura care isi prezeva valoarea;"
          />

          <Typography component="p">
            6. Cum credeti ca vi se potriveste urmatorul principiu
            investitional: imi asum un risc de investitie pe termen scurt
            anticipand realizarea unui profit considerabil pe termen lung?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="6-1" disabled checked={applicationAnswer[6][1]} />
            }
            label="Mi se potriveste perfect;"
          />
          <FormControlLabel
            control={
              <Checkbox id="6-2" disabled checked={applicationAnswer[6][2]} />
            }
            label="Mi se potriveste insa numai moderat;"
          />
          <FormControlLabel
            control={
              <Checkbox id="6-3" disabled checked={applicationAnswer[6][3]} />
            }
            label="Nu mi se potriveste;"
          />
          <FormControlLabel
            control={
              <Checkbox id="6-4" disabled checked={applicationAnswer[6][4]} />
            }
            label="Nu stiu."
          />

          <Typography component="p">
            7. Ce orizont de timp aveti in vedere pentru mentinerea unei
            investitii realizate? Ce interval de timp investitional aveti in
            vedere?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="7-1" disabled checked={applicationAnswer[7][1]} />
            }
            label="6 ani;"
          />
          <FormControlLabel
            control={
              <Checkbox id="7-2" disabled checked={applicationAnswer[7][2]} />
            }
            label="4 ani;"
          />
          <FormControlLabel
            control={
              <Checkbox id="7-3" disabled checked={applicationAnswer[7][3]} />
            }
            label="3 ani;"
          />
          <FormControlLabel
            control={
              <Checkbox id="7-4" disabled checked={applicationAnswer[7][4]} />
            }
            label="maxim 2 ani."
          />

          <Typography component="p">
            8. Care ar fi masurile pe care le-ati adopta in cazul in care
            investitia pe care ati facut-o intr-o societate de tip start-up
            si/sau intr-o societate care se afla intr-un stadiu incipient sau
            partial avansat de dezvoltare a activitatilor, ar scadea intr-un an
            cu 20%?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="8-1" disabled checked={applicationAnswer[8][1]} />
            }
            label="Privesc scaderea ca pe o oportunitate si investesc suplimentar in respective societate;"
          />
          <FormControlLabel
            control={
              <Checkbox id="8-2" disabled checked={applicationAnswer[8][2]} />
            }
            label="Nu adopt nicio masura ci astept ca investitia sa isi revina in anul/anii urmatori, am incredere in activitatea si viitorul investitiei;"
          />
          <FormControlLabel
            control={
              <Checkbox id="8-3" disabled checked={applicationAnswer[8][3]} />
            }
            label="Lichidez partial investitia facuta pentru a minimiza pierderea;"
          />
          <FormControlLabel
            control={
              <Checkbox id="8-4" disabled checked={applicationAnswer[8][4]} />
            }
            label="Lichidez total investitia facuta pentru a recupera restul de 80% ramas din valoarea investita."
          />

          <Typography component="p">
            9. Raspundeti urmatoarei afirmatii: Ma bazez pe _______ (inserati
            procentul alegand din optiunile de mai jos) din sumele pe care
            intentionez sa le investesc in relatia cu Vidi Vici Afia srl,
            inclusiv castigurile generate din aceasta relatie, pentru a acoperi
            cheltuielile subsemnatului/subsemnatei din acest an:
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="9-1" disabled checked={applicationAnswer[9][1]} />
            }
            label="Mai putin de 10%;"
          />
          <FormControlLabel
            control={
              <Checkbox id="9-2" disabled checked={applicationAnswer[9][2]} />
            }
            label="Mai putin de 20%;"
          />
          <FormControlLabel
            control={
              <Checkbox id="9-3" disabled checked={applicationAnswer[9][3]} />
            }
            label="Intre 25% si 50%;"
          />
          <FormControlLabel
            control={
              <Checkbox id="9-4" disabled checked={applicationAnswer[9][4]} />
            }
            label="Mai mult de 50%"
          />

          <Typography component="p">
            10. Ce tip de investitii ati realizat in trecut, in ce fel de
            produse, care este experienta dumneavoastra investitionala cu astfel
            de produse si care este gradul de cunoastere al riscurilor aferente
            acestor produse?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                id="10-1-1"
                disabled
                checked={applicationAnswer[10][1][1]}
              />
            }
            label="Am investit in produse cu venit fix (e.g. obligatiuni, certificate de depozit);"
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Am o experienta de cu investitii in aceste produse:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-1-2"
                disabled
                checked={applicationAnswer[10][1][2]}
              />
            }
            label="< 2 ani ;"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="10-1-3"
                disabled
                checked={applicationAnswer[10][1][3]}
              />
            }
            label=" ≥ 2 ani"
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Cunosc riscurile aferente acestor produse:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-1-4"
                disabled
                checked={applicationAnswer[10][1][4]}
              />
            }
            label="da ;"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="10-1-5"
                disabled
                checked={applicationAnswer[10][1][5]}
              />
            }
            label="nu"
          />

          <FormControlLabel
            control={
              <Checkbox
                id="10-2-1"
                disabled
                checked={applicationAnswer[10][2][1]}
              />
            }
            label="Am investit in actiuni ale unor emitenti listati pe piete de capital/sisteme alternative de tranzactionare;"
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Am o experienta de cu investitii in aceste produse
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-2-2"
                disabled
                checked={applicationAnswer[10][2][2]}
              />
            }
            label="< 2 ani ;"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="10-2-3"
                disabled
                checked={applicationAnswer[10][2][3]}
              />
            }
            label=" ≥ 2 ani"
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Cunosc riscurile aferente acestor produse:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-2-4"
                disabled
                checked={applicationAnswer[10][2][4]}
              />
            }
            label="da ;"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="10-2-5"
                disabled
                checked={applicationAnswer[10][2][5]}
              />
            }
            label="nu"
          />

          <FormControlLabel
            control={
              <Checkbox
                id="10-3-1"
                disabled
                checked={applicationAnswer[10][3][1]}
              />
            }
            label="Am investit in instrumente financiare derivate tranzactionate public sau OTC;"
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Am o experienta de cu investitii in aceste produse
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-3-2"
                disabled
                checked={applicationAnswer[10][3][2]}
              />
            }
            label="< 2 ani ;"
          />
          <FormControlLabel
            control={<Checkbox id="10-3-3" />}
            label=" ≥ 2 ani"
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Cunosc riscurile aferente acestor produse:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-3-4"
                disabled
                checked={applicationAnswer[10][3][4]}
              />
            }
            label="da ;"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="10-3-5"
                disabled
                checked={applicationAnswer[10][3][5]}
              />
            }
            label="nu"
          />

          <FormControlLabel
            control={
              <Checkbox
                id="10-4-1"
                disabled
                checked={applicationAnswer[10][4][1]}
              />
            }
            label="Am investit in actiuni, parti sociale, parti de interes emise de societati inchise (nelistate) si a caror activitate era de tip start-up sau se afla intr-un stadiu incipient sau partial avansat de dezvoltare, avand produse/servicii atractive/innovative/de perspectiva pentru randamentul unei investitii;  "
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Am o experienta de cu investitii in aceste produse
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-4-2"
                disabled
                checked={applicationAnswer[10][4][2]}
              />
            }
            label="< 2 ani ;"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="10-4-3"
                disabled
                checked={applicationAnswer[10][4][3]}
              />
            }
            label=" ≥ 2 ani"
          />

          <Typography component="p" sx={{ marginLeft: -2 }}>
            Cunosc riscurile aferente acestor produse:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="10-4-4"
                disabled
                checked={applicationAnswer[10][4][4]}
              />
            }
            label="da ;"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="10-4-5"
                disabled
                checked={applicationAnswer[10][4][5]}
              />
            }
            label="nu"
          />

          <Typography component="p">
            11. Cate tranzactii de investitii realizati in general in cursul
            unui an, indiferent ca este vorba despre investitii precum cele in
            produse cu venit fix, actiuni, unitati de fond, instrumente
            financiare derivate, actiuni/parti sociale/parti de interes in
            societati nelistate?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="11-1" disabled checked={applicationAnswer[11][1]} />
            }
            label="20 sau mai multe;"
          />
          <FormControlLabel
            control={
              <Checkbox id="11-2" disabled checked={applicationAnswer[11][2]} />
            }
            label="intre 10 si 20;"
          />
          <FormControlLabel
            control={
              <Checkbox id="11-3" disabled checked={applicationAnswer[11][3]} />
            }
            label="mai putin de 10;"
          />
          <FormControlLabel
            control={
              <Checkbox id="11-4" disabled checked={applicationAnswer[11][4]} />
            }
            label="niciuna."
          />

          <Typography component="p">
            12. Care este pentru dumneavoastra suma uzuala pe care o dedicati
            unei investitii obisnuite pe care o realizati?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="12-1" disabled checked={applicationAnswer[12][1]} />
            }
            label="100.000 Euro sau mai mult;"
          />
          <FormControlLabel
            control={
              <Checkbox id="12-2" disabled checked={applicationAnswer[12][2]} />
            }
            label="intre 50.000 Euro si 100.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="12-3" disabled checked={applicationAnswer[12][3]} />
            }
            label="intre 30.000 Euro si 50.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="12-4" disabled checked={applicationAnswer[12][4]} />
            }
            label="intre 10.000 Euro si 30.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="12-5" disabled checked={applicationAnswer[12][5]} />
            }
            label="mai putin de 10.000 de Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="12-6" disabled checked={applicationAnswer[12][6]} />
            }
            label="nu am investit inca o anumita suma;"
          />

          <Typography component="p">
            13. Care este dimensiunea valorica a portofoliului dumneavoastra de
            investitii, indiferent ca este vorba despre investitii precum cele
            in produse cu venit fix, actiuni, unitati de fond, instrumente
            financiare derivate, actiuni/parti sociale/parti de interes in
            societati nelistate, depozite bancare, bunuri imobile?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="13-1" disabled checked={applicationAnswer[13][1]} />
            }
            label="500.000 Euro sau mai mult;"
          />
          <FormControlLabel
            control={
              <Checkbox id="13-2" disabled checked={applicationAnswer[13][2]} />
            }
            label="intre 50.000 Euro si 100.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="13-3" disabled checked={applicationAnswer[13][3]} />
            }
            label="intre 30.000 Euro si 50.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="13-4" disabled checked={applicationAnswer[13][4]} />
            }
            label="intre 10.000 Euro si 30.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="13-5" disabled checked={applicationAnswer[13][5]} />
            }
            label="mai putin de 10.000 de Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="13-6" disabled checked={applicationAnswer[13][6]} />
            }
            label="nu am inca un portofoliu de investitii."
          />

          <Typography component="p">
            14. Ce suma sunteti dispus(a) sa investiti in actiuni, parti
            sociale, parti de interes emise de societati inchise (nelistate) si
            a caror activitate era de tip start-up sau se afla intr-un stadiu
            incipient sau partial avansat de dezvoltare, inclusiv dar fara a se
            limita la dezvoltarea unui/unor produs(e)/serviciu(ii) de interes
            pentru realizarea unei investitii?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox id="14-1" disabled checked={applicationAnswer[14][1]} />
            }
            label="100.000 Euro sau mai mult;"
          />
          <FormControlLabel
            control={
              <Checkbox id="14-2" disabled checked={applicationAnswer[14][2]} />
            }
            label="intre 50.000 Euro si 100.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="14-3" disabled checked={applicationAnswer[14][3]} />
            }
            label="intre 30.000 Euro si 50.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="14-4" disabled checked={applicationAnswer[14][4]} />
            }
            label="intre 10.000 Euro si 30.000 Euro;"
          />
          <FormControlLabel
            control={
              <Checkbox id="14-5" disabled checked={applicationAnswer[14][5]} />
            }
            label="mai putin de 10.000 de Euro;"
          />

          <Typography component="p">
            15. Posedati experienta profesionala, prezenta sau trecuta, de cel
            putin 1 an in materie de investitii precum cele in produse cu venit
            fix, actiuni, unitati de fond, instrumente financiare derivate,
            actiuni/parti sociale/parti de interes in societati nelistate sau in
            sectorul financiar sau intr-o profesie reglementata (e.g. avocat,
            consultant financiar, contabil) care acorda incidental consultanta
            de investitii?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                id="15-1-1"
                disabled
                checked={applicationAnswer[15][1][1]}
              />
            }
            label="da, posed o astfel de experienta profesionala sau ma pot califica drept investitor profesional intrucat activez / am activat in (a se descrie pe scurt, inclusiv activitati incidentale de acordare consultanta in investitii in baza unei profesii reglementate) "
          />

          <FormControlLabel
            sx={{ marginLeft: 5 }}
            control={
              <TextareaAutosize
                id="15-1-2"
                disabled
                placeholder={applicationAnswer[15][1][2]}
              />
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                id="15-2-1"
                disabled
                checked={applicationAnswer[15][2][1]}
              />
            }
            label="desi nu posed o astfel de experienta profesionala, consider ca pot fi calificat drept investitor profesional intrucat am urmat cursuri si studii profesionale in legatura cu investitii in produse cu venit fix, actiuni, unitati de fond, instrumente financiare derivate, actiuni/parti sociale/parti de interes in societati nelistate la (a se descrie pe scurt)"
          />

          <FormControlLabel
            sx={{ marginLeft: 5 }}
            control={
              <TextareaAutosize
                id="15-2-2"
                disabled
                placeholder={applicationAnswer[15][2][2]}
              />
            }
          />

          <FormControlLabel
            control={
              <Checkbox id="15-3" disabled checked={applicationAnswer[15][3]} />
            }
            label="nu posed experienta profesionala in niciunul dintre domeniile mentionate."
          />

          <Typography component="p">
            16. Posedati experienta in mod particular in materie de investitii
            in societati nelistate de tip start-up si/sau societati care se afla
            intr-un stadiu incipient sau partial avansat de dezvoltare a
            activitatilor, inclusiv dar fara a se limita la dezvoltarea de
            produs(e)/serviciu(ii) de interes pentru realizarea unei investitii?
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                id="16-1-1"
                disabled
                checked={applicationAnswer[16][1][1]}
              />
            }
            label="da, posed o astfel de experienta intrucat investesc / am investit in (a se descrie pe scurt) "
          />

          <FormControlLabel
            sx={{ marginLeft: 5 }}
            control={
              <TextareaAutosize
                id="16-1-2"
                disabled
                placeholder={applicationAnswer[16][1][2]}
              />
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                id="16-2-1"
                disabled
                checked={applicationAnswer[16][2][1]}
              />
            }
            label={`desi nu posed o astfel de experienta, consider ca pot fi calificat drept investitor profesional intrucat, in exercitarea profesiei de (a se insera), am desfasurat activitati de consultanta / asistenta tehnica/operationala in legatura cu astfel de investitii in in societati nelistate de tip start-up si/sau care se afla intr-un stadiu incipient sau partial avansat de dezvoltare a activitatilor, inclusiv dar fara a se limita la dezvoltarea unui/unor produs(e)/serviciu(ii) de interes pentru realizarea unei investitie in sensul ca (a se insera pe scurt tipul de activitati si detalii despre investitii)`}
          />

          <FormControlLabel
            sx={{ marginLeft: 5 }}
            control={
              <TextareaAutosize
                id="16-2-2"
                disabled
                placeholder={applicationAnswer[16][2][2]}
              />
            }
          />
          <Typography component="p">introdu profesia</Typography>
          <FormControlLabel
            sx={{ marginLeft: 5 }}
            control={
              <TextareaAutosize
                id="16-2-3"
                disabled
                placeholder={applicationAnswer[16][2][3]}
              />
            }
          />

          <FormControlLabel
            control={
              <Checkbox id="16-3" disabled checked={applicationAnswer[16][3]} />
            }
            label="nu posed experienta profesionala in niciunul dintre domeniile mentionate."
          />

          <Box m="20px">
            <Typography component="h1" variant="h5">
              Subsemnatul {user}-{user}
            </Typography>
            <Typography component="h1" variant="h5">
              Data:
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserApplication;
