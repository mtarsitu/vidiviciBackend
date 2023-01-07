import { SetStateAction, useState } from "react";
import styles from "./styles.module.scss";

export default function Register() {
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState({image1: '', image2:''});

//   console.log(createObjectURL);
  const imageList: SetStateAction<undefined> | string[] = [];

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
    //   imageList.push(URL.createObjectURL(i));
      //@ts-ignore
      createObjectURL["image1"] = URL.createObjectURL(i);
    }
  };

    const uploadToClient2 = (event: any) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];

        setImage2(i);
        // imageList.push(URL.createObjectURL(i));
        //@ts-ignore
        createObjectURL["image2"] = URL.createObjectURL(i);
      }
    };

  const uploadToServer = async (event: any) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
  };

  return (
    <div className={styles.register}>
      <h1>CHESTIONAR PENTRU DETERMINAREA TIPULUI DE INVESTITOR</h1>
      <form className={styles.register_form}>
        <p>
          Va rugam sa completati chestionarul urmator pentru a ne permite
          realizarea unei evaluari obiective asupra profilului dumneavoastra de
          investitor si pentru a determina daca sunteti un investitor
          profesional si solicitati in mod expres a fiti tratat ca atare in
          relatia cu
        </p>
        <input
          type="text"
          name="firma"
          placeholder="Firma"
          // onChange={(e) => handleChange(e)}
        />
        <p>
          sau sunteti un investitor de retail - in intelesul acestor doua
          acceptiuni ale tipului de investitor din art. 2 lit. m) si n) din
          Legea nr. 243/2019 privind privind reglementarea fondurilor de
          investitii alternative si pentru modificarea si completarea unor acte
          normative.
        </p>
        <p>
          Intrebarile din prezentul chestionar au in vedere in principal (insa
          fara a se limita la acestea): stabilirea cunostintelor dumneavoastra
          in materie de investitii ale unui Fond de Investitii Alternative cu
          Capital Privat, gradul de risc pe care sunteti dispus sa vi-l asumati
          in legatura cu tipul de investii ale
        </p>
        <input
          type="text"
          name="firma2"
          placeholder="Firma2"
          // onChange={(e) => handleChange(e)}
        />
        <p>
          timpul pe care il aveti in vedere pentru realizarea investitiilor,
          experienta dumneavoastra in domeniul financiar si experienta in cadrul
          tranzactiilor si/sau a serviciilor relevante unui Fond de Investitii
          Alternative cu Capital Privat.
        </p>
        <p>Va rugam incercuiti raspunsul corect in mod corespunzator. </p>
        <ol className={styles.formular}>
          <li>
            Cum poate fi caracterizata situatia dumneavoastra financiara din
            prezent:
          </li>
          <label>
            <input type="checkbox" />
            Nu am datorii
          </label>
          <label>
            <input type="checkbox" />
            Am un credit ipotecar cu o rata rezonabila
          </label>
          <label>
            <input type="checkbox" />
            Am doua sau mai multe credite ipotecare
          </label>
          <label>
            <input type="checkbox" />
            Am doua sau mai multe credite ipotecare si alte datorii
          </label>
          <label>
            <input type="checkbox" />
            Am alte datorii dar nu am credite ipotecare.
          </label>

          <li>
            Aveti in prezent si preconizati ca veti avea si in viitor un venit
            cert si sigur provenind de exemplu dintr-o activitate remunerata,
            din onorarii, din cedarea folosintei unor bunuri, din investitii,
            din pensii?
          </li>
          <label>
            <input type="checkbox" />
            Da, am un venit cert si sigur;
          </label>
          <label>
            <input type="checkbox" />
            Da, am un venit destul de cert si sigur;
          </label>
          <label>
            <input type="checkbox" />
            Am un venit oarecum cert si sigur;
          </label>
          <label>
            <input type="checkbox" />
            Nu, nu am un venit cert si/sau sigur.
          </label>

          <li>
            Care este experienta dumneavoastra in realizarea de investitii in
            societatii de tip start-up-urilor si/sau societati care se afla
            intr-un stadiu incipient sau partial avansat de dezvoltare a
            activitatilor, inclusiv dar fara a se limita la dezvoltarea de
            produs(e)/serviciu(ii) de interes pentru realizarea unei investitii?
          </li>
          <label>
            <input type="checkbox" />
            Posed experienta suficienta, cunosc elementele unei astfel de
            investitii, am capacitatea de a analiza si intelege pe deplin
            tipurile de activitati ale unor astfel de societatii precum si
            circumstantele care pot influenta in mod negativ investitiile in
            astfel de societati;
          </label>
          <label>
            <input type="checkbox" />
            Posed experienta in materie investitionala in general, pot estima
            care sunt circumstantele ce pot conduce la cresterea, scaderea sau
            stagnarea unei investitii in astfel de societati precum si care ar
            putea fi performanta unei astfel de investii;
          </label>
          <label>
            <input type="checkbox" />
            Posed experienta limitata in materie investitionala, inclusiv in
            acest tip de societati, sunt oarecum la inceput de drum in materie
            de investitii;
          </label>
          <label>
            <input type="checkbox" />
            Nu posed experienta in materie de investitii, este o prima
            experienta in acest domeniu in ceea ce ma priveste.
          </label>

          <li>
            Cum este mai important pentru dumneavoastra certitudinea obtinerii
            unui profit in urma unei investitii, chiar daca profitul este modic
            sau angajarea unei investitii ce presupune obtinerea unui profit
            semnificativ insa nu foarte cert ca realizare?
          </li>
          <label>
            <input type="checkbox" />
            Certitudinea obtinerii unui profit chiar daca este modic
          </label>
          <label>
            <input type="checkbox" />
            Obtinerea unui profit semnificativ desi nu foarte cert ca realizare;
          </label>
          <label>
            <input type="checkbox" />
            Oricare dintre acestea;
          </label>

          <li>Ce tip de investitie urmariti sa realizati?</li>
          <label>
            <input type="checkbox" />o investitie care sa imbunatateasca
            randamentul tuturor celorlalte investitii pe care le-am realizat si
            le realizez, fara sa conteze veniturile imediate pe care le-as
            obtine din aceasta investitie;
          </label>
          <label>
            <input type="checkbox" />o investitie cu un grad mai redus de
            expunere si care sa imi genereze un venit periodic;
          </label>
          <label>
            <input type="checkbox" />o investitie fara grad de expunere care imi
            genereaza un venit periodic;
          </label>
          <label>
            <input type="checkbox" />o investitie sigura care isi prezeva
            valoarea;
          </label>

          <li>
            Cum credeti ca vi se potriveste urmatorul principiu investitional:
            imi asum un risc de investitie pe termen scurt anticipand realizarea
            unui profit considerabil pe termen lung?
          </li>
          <label>
            <input type="checkbox" />
            Mi se potriveste perfect;
          </label>
          <label>
            <input type="checkbox" />
            Mi se potriveste insa numai moderat;
          </label>
          <label>
            <input type="checkbox" />
            Nu mi se potriveste;
          </label>
          <label>
            <input type="checkbox" />
            Nu stiu.
          </label>

          <li>
            Ce orizont de timp aveti in vedere pentru mentinerea unei investitii
            realizate? Ce interval de timp investitional aveti in vedere?
          </li>
          <label>
            <input type="checkbox" />6 ani;
          </label>
          <label>
            <input type="checkbox" />4 ani;
          </label>
          <label>
            <input type="checkbox" />3 ani;
          </label>
          <label>
            <input type="checkbox" />
            maxim 2 ani.
          </label>

          <li>
            Care ar fi masurile pe care le-ati adopta in cazul in care
            investitia pe care ati facut-o intr-o societate de tip start-up
            si/sau intr-o societate care se afla intr-un stadiu incipient sau
            partial avansat de dezvoltare a activitatilor, ar scadea intr-un an
            cu 20%?
          </li>
          <label>
            <input type="checkbox" />
            Privesc scaderea ca pe o oportunitate si investesc suplimentar in
            respective societate;
          </label>
          <label>
            <input type="checkbox" />
            Nu adopt nicio masura ci astept ca investitia sa isi revina in
            anul/anii urmatori, am incredere in activitatea si viitorul
            investitiei;
          </label>
          <label>
            <input type="checkbox" />
            Lichidez partial investitia facuta pentru a minimiza pierderea;
          </label>
          <label>
            <input type="checkbox" />
            Lichidez total investitia facuta pentru a recupera restul de 80%
            ramas din valoarea investita.
          </label>

          <li>
            Raspundeti urmatoarei afirmatii: Ma bazez pe _______ (inserati
            procentul alegand din optiunile de mai jos) din sumele pe care
            intentionez sa le investesc in relatia cu_______________., inclusiv
            castigurile generate din aceasta relatie, pentru a acoperi
            cheltuielile subsemnatului/subsemnatei din acest an:
          </li>
          <label>
            <input type="checkbox" />
            Mai putin de 10%;
          </label>
          <label>
            <input type="checkbox" />
            Mai putin de 20%;
          </label>
          <label>
            <input type="checkbox" />
            Intre 25% si 50%;
          </label>
          <label>
            <input type="checkbox" />
            Mai mult de 50%
          </label>

          <li>
            Ce tip de investitii ati realizat in trecut, in ce fel de produse,
            care este experienta dumneavoastra investitionala cu astfel de
            produse si care este gradul de cunoastere al riscurilor aferente
            acestor produse?
          </li>
          <label>
            <input type="checkbox" />
            Am investit in produse cu venit fix (e.g. obligatiuni, certificate
            de depozit); Am o experienta de: □ mai putin de 2 ani ; □ ≥ 2 ani cu
            investitii in aceste produse; Cunosc riscurile aferente acestor
            produse: □ da; □ nu;
          </label>
          <label>
            <input type="checkbox" />
            Am investit in actiuni ale unor emitenti listati pe piete de
            capital/sisteme alternative de tranzactionare; Am o experienta de: □
            mai putin de 2 ani ; □ ≥ 2 ani cu investitii in aceste produse;
            Cunosc riscurile aferente acestor produse: □ da; □ nu;
          </label>
          <label>
            <input type="checkbox" />
            Am investit in unitati de fond/actiuni emise de fonduri inchise si
            fonduri deschise de investitii (inclusiv fonduri de hedging si
            private equity); Am o experienta de: □ mai putin de 2 ani ; □ ≥ 2
            ani cu investitii in aceste produse; Cunosc riscurile aferente
            acestor produse: □ da; □ nu;
          </label>
          <label>
            <input type="checkbox" />
            Am investit in instrumente financiare derivate tranzactionate public
            sau OTC; Am o experienta de: □ mai putin de 2 ani ; □ ≥ 2 ani cu
            investitii in aceste produse; Cunosc riscurile aferente acestor
            produse: □ da; □ nu;
          </label>
          <label>
            <input type="checkbox" />
            Am investit in actiuni, parti sociale, parti de interes emise de
            societati inchise (nelistate) si a caror activitate era de tip
            start-up sau se afla intr-un stadiu incipient sau partial avansat de
            dezvoltare, avand produse/servicii atractive/innovative/de
            perspectiva pentru randamentul unei investitii; Am o experienta de:
            □ mai putin de 2 ani ; □ ≥ 2 ani cu investitii in aceste produse;
            Cunosc riscurile aferente acestor produse: □ da; □ nu.
          </label>

          <li>
            Cate tranzactii de investitii realizati in general in cursul unui
            an, indiferent ca este vorba despre investitii precum cele in
            produse cu venit fix, actiuni, unitati de fond, instrumente
            financiare derivate, actiuni/parti sociale/parti de interes in
            societati nelistate?
          </li>
          <label>
            <input type="checkbox" />
            20 sau mai multe;
          </label>
          <label>
            <input type="checkbox" />
            intre 10 si 20;
          </label>
          <label>
            <input type="checkbox" />
            mai putin de 10;
          </label>
          <label>
            <input type="checkbox" />
            niciuna.
          </label>

          <li>
            Care este pentru dumneavoastra suma uzuala pe care o dedicati unei
            investitii obisnuite pe care o realizati?
          </li>
          <label>
            <input type="checkbox" />
            100.000 Euro sau mai mult;
          </label>
          <label>
            <input type="checkbox" />
            intre 50.000 Euro si 100.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            intre 30.000 Euro si 50.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            intre 10.000 Euro si 30.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            mai putin de 10.000 de Euro;
          </label>
          <label>
            <input type="checkbox" />
            nu am investit inca o anumita suma;
          </label>

          <li>
            Care este dimensiunea valorica a portofoliului dumneavoastra de
            investitii, indiferent ca este vorba despre investitii precum cele
            in produse cu venit fix, actiuni, unitati de fond, instrumente
            financiare derivate, actiuni/parti sociale/parti de interes in
            societati nelistate, depozite bancare, bunuri imobile?
          </li>
          <label>
            <input type="checkbox" />
            500.000 Euro sau mai mult;
          </label>
          <label>
            <input type="checkbox" />
            intre 50.000 Euro si 100.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            intre 30.000 Euro si 50.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            intre 10.000 Euro si 30.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            mai putin de 10.000 de Euro;
          </label>
          <label>
            <input type="checkbox" />
            nu am inca un portofoliu de investitii.
          </label>

          <li>
            Ce suma sunteti dispus(a) sa investiti in actiuni, parti sociale,
            parti de interes emise de societati inchise (nelistate) si a caror
            activitate era de tip start-up sau se afla intr-un stadiu incipient
            sau partial avansat de dezvoltare, inclusiv dar fara a se limita la
            dezvoltarea unui/unor produs(e)/serviciu(ii) de interes pentru
            realizarea unei investitii?
          </li>
          <label>
            <input type="checkbox" />
            100.000 Euro sau mai mult;
          </label>
          <label>
            <input type="checkbox" />
            intre 50.000 Euro si 100.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            intre 30.000 Euro si 50.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            intre 10.000 Euro si 30.000 Euro;
          </label>
          <label>
            <input type="checkbox" />
            mai putin de 10.000 de Euro.
          </label>

          <li>
            Posedati experienta profesionala, prezenta sau trecuta, de cel putin
            1 an in materie de investitii precum cele in produse cu venit fix,
            actiuni, unitati de fond, instrumente financiare derivate,
            actiuni/parti sociale/parti de interes in societati nelistate sau in
            sectorul financiar sau intr-o profesie reglementata (e.g. avocat,
            consultant financiar, contabil) care acorda incidental consultanta
            de investitii?
          </li>
          <label>
            <input type="checkbox" />
            da, posed o astfel de experienta profesionala sau ma pot califica
            drept investitor profesional intrucat activez / am activat in (a se
            descrie pe scurt, inclusiv activitati incidentale de acordare
            consultanta in investitii in baza unei profesii reglementate)
            …………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………;
          </label>
          <label>
            <input type="checkbox" />
            desi nu posed o astfel de experienta profesionala, consider ca pot
            fi calificat drept investitor profesional intrucat am urmat cursuri
            si studii profesionale in legatura cu investitii in produse cu venit
            fix, actiuni, unitati de fond, instrumente financiare derivate,
            actiuni/parti sociale/parti de interes in societati nelistate la (a
            se descrie pe scurt) ………………………………………………………………….;
          </label>
          <label>
            <input type="checkbox" />
            nu posed experienta profesionala in niciunul dintre domeniile
            mentionate.
          </label>

          <li>
            Posedati experienta in mod particular in materie de investitii in
            societati nelistate de tip start-up si/sau societati care se afla
            intr-un stadiu incipient sau partial avansat de dezvoltare a
            activitatilor, inclusiv dar fara a se limita la dezvoltarea de
            produs(e)/serviciu(ii) de interes pentru realizarea unei investitii?
          </li>
          <label>
            <input type="checkbox" />
            da, posed o astfel de experienta intrucat investesc / am investit in
            (a se descrie pe scurt)
            …………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………………;
          </label>
          <label>
            <input type="checkbox" />
            desi nu posed o astfel de experienta, consider ca pot fi calificat
            drept investitor profesional intrucat, in exercitarea profesiei de
            …………………………………………….. (a se insera), am desfasurat activitati de
            consultanta / asistenta tehnica/operationala in legatura cu astfel
            de investitii in in societati nelistate de tip start-up si/sau care
            se afla intr-un stadiu incipient sau partial avansat de dezvoltare a
            activitatilor, inclusiv dar fara a se limita la dezvoltarea
            unui/unor produs(e)/serviciu(ii) de interes pentru realizarea unei
            investitie in sensul ca (a se insera pe scurt tipul de activitati si
            detalii despre investitii) ……………………………………………………………………………….;
          </label>
          <label>
            <input type="checkbox" />
            nu posed experienta profesionala in legatura cu tipul de societati
            mentionate.
          </label>
        </ol>

        <div>
          <img src={createObjectURL.image1} />
          <h4>Uploadeaza poza cu CI</h4>
          <input type="file" name="myImage" onChange={uploadToClient} />
          {/* <button
            className="btn btn-primary"
            type="submit"
            onClick={uploadToServer}
          >
            Send to server
          </button> */}
        </div>

        <div>
          <img src={createObjectURL.image2} />
          <h4>Uploadeaza un selfie cu tine</h4>
          <input type="file" name="myImage2" onChange={uploadToClient2} />
          {/* <button
            className="btn btn-primary"
            type="submit"
            onClick={uploadToServer}
          >
            Send to server
          </button> */}
        </div>

        <p>
          Subsemnatul …………………………………………., inteleg pe deplin continutul
          prezentului chestionar si confirm ca informatiile pe care le-am
          furnizat sunt corecte si complete.
        </p>
        <p>Semnatura: ……………………………..</p>
        <p>Data: ………………………………..</p>
        <p>Prin dl________________________</p>
        <p>În calitate de Director </p>
        <p>Data: ________________________</p>
      </form>
    </div>
  );
}
