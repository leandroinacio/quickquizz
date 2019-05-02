const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion;
let isAvailable = false;
let questions = [];
let score = 0;
let questionCounter = 0;

// Constants
const CORRECT_BONUT = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  currentQuestion = 0;
  isAvaiable = true;
  score = 0;
  questionCounter = 0;
  console.log(`ok`);
};

getNewQuestion = () => {};

startGame();
