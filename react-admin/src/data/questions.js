// const questionsAnswers = {
//   1: {
//     question:
//       "Cum poate fi caracterizata situatia dumneavoastra financiara din prezent:",
//     answers: {
//       1: "Nu am datorii;",
//       2: "Am un credit ipotecar cu o rata rezonabila;",
//       3: "Am doua sau mai multe credite ipotecare;",
//       4: "Am doua sau mai multe credite ipotecare si alte datorii;",
//       5: "Am alte datorii dar nu am credite ipotecare.",
//     },
//   },
//   2: {
//     question:
//       "Aveti in prezent si preconizati ca veti avea si in viitor un venit cert si sigur provenind de exemplu dintr-o activitate remunerata, din onorarii, din cedarea folosintei unor bunuri, din investitii, din pensii?",
//     answers: {
//       1: "Da, am un venit cert si sigur;",
//       2: "Da, am un venit destul de cert si sigur;",
//       3: "Am un venit oarecum cert si sigur;",
//       4: "Nu, nu am un venit cert si/sau sigur.",
//     },
//   },
// };

const formObject = {
  1: { 1: false, 2: false, 3: false, 4: false, 5: false },
  2: { 1: false, 2: false, 3: false, 4: false },
  3: { 1: false, 2: false, 3: false, 4: false },
  4: { 1: false, 2: false, 3: false },
  5: { 1: false, 2: false, 3: false, 4: false },
  6: { 1: false, 2: false, 3: false, 4: false },
  7: { 1: false, 2: false, 3: false, 4: false },
  8: { 1: false, 2: false, 3: false, 4: false },
  9: { 1: false, 2: false, 3: false, 4: false },
  10: {
    1: { 1: false, 2: false, 3: false, 4: false, 5: false },
    2: { 1: false, 2: false, 3: false, 4: false, 5: false },
    3: { 1: false, 2: false, 3: false, 4: false, 5: false },
    4: { 1: false, 2: false, 3: false, 4: false, 5: false },
  },
  11: { 1: false, 2: false, 3: false, 4: false },
  12: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
  13: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
  14: { 1: false, 2: false, 3: false, 4: false, 5: false },
  15: {
    1: { 1: false, 2: "" },
    2: { 1: false, 2: "" },
    3: false,
  },
  16: {
    1: { 1: false, 1: "" },
    2: { 1: false, 2: "", 3: "" },
  },
};

export default formObject;
