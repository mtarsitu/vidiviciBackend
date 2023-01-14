const questionsAnswers = {
  1: {
    question:
      "Cum poate fi caracterizata situatia dumneavoastra financiara din prezent:",
    answers: {
      a: "Nu am datorii;",
      b: "Am un credit ipotecar cu o rata rezonabila;",
      c: "Am doua sau mai multe credite ipotecare;",
      d: "Am doua sau mai multe credite ipotecare si alte datorii;",
      e: "Am alte datorii dar nu am credite ipotecare.",
    },
  },
  2:{
    question:"Aveti in prezent si preconizati ca veti avea si in viitor un venit cert si sigur provenind de exemplu dintr-o activitate remunerata, din onorarii, din cedarea folosintei unor bunuri, din investitii, din pensii?",
    answers:{
        a:"Da, am un venit cert si sigur;",
        b:"Da, am un venit destul de cert si sigur;",
        c:"Am un venit oarecum cert si sigur;",
        d:"Nu, nu am un venit cert si/sau sigur."
    }
  },
};

const formObject = {
  1: { a: false, b: false, c: false, d: false, e: false, question:questionsAnswers[0].question, answers:questionsAnswers[0].answers },
  2: { a: false, b: false, c: false, d: false },
  3: { a: false, b: false, c: false, d: false },
  4: { a: false, b: false, c: false },
  5: { a: false, b: false, c: false, d: false },
  6: { a: false, b: false, c: false, d: false },
  7: { a: false, b: false, c: false, d: false },
  8: { a: false, b: false, c: false, d: false },
  9: { a: false, b: false, c: false, d: false },
  10: {
    a: { a: false, a1: false, a2: false },
    b: { b: false, b1: false, b2: false },
    c: { c: false, c1: false, c2: false },
    d: { d: false, d1: false, d2: false },
    e: { e: false, e1: false, e2: false },
  },
  11: { a: false, b: false, c: false, d: false, e: false, f: false },
  12: { a: false, b: false, c: false, d: false, e: false, f: false },
  13: { a: false, b: false, c: false, d: false, e: false, f: false },
  14: { a: false, b: false, c: false, d: false, e: false },
  15: {
    a: { a: false, a1: "" },
    b: { b: false, b1: "" },
    c: false,
  },
  16: {
    a: { a: false, a1: "" },
    b: { b: false, b1: "", b2: "" },
  },
};

export default formObject;
