(function() {
  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));

  let currentQuestion;
  let isAvailable = false;
  let questions = [
    {
      question: "What is the brazilian oficial language?",
      options: ["Spanish", "Portuguese", "English", "Chinese"],
      correctAnswer: 1
    }
  ];
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
    availableQuestions = [...questions];
    getNewQuestion();
  };

  getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.map(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion.options[number];
    });
  };

  startGame();
})();
