(function() {
  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const points = document.getElementById("points");

  let currentQuestion;
  let isAvailable = false;
  let questions = [
    {
      question: "What is the brazilian oficial language?",
      options: ["Spanish", "Portuguese", "English", "Chinese"],
      correctAnswer: 1
    },
    {
      question: "What is the file extension to javascript files?",
      options: [".ts", ".javascript", ".jvsc", "js"],
      correctAnswer: 3
    }
  ];
  let score = 0;
  let questionCounter = 0;

  // Constants
  const CORRECT_BONUS = 10;
  const MAX_QUESTIONS = 3;

  // Setup everything back to 0 and get first question
  startGame = () => {
    currentQuestion = 0;
    isAvaiable = false;
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    setupClickOnOptions();
  };

  getNewQuestion = () => {
    // Get new question only if there are any available
    if (availableQuestions.length === 0) {
      window.location.assign("/game-over.html");
      return;
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.map(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion.options[number];
    });

    // Remove from unused questions' list
    availableQuestions.splice(questionIndex, 1);
    isAvailable = true;
  };

  setupClickOnOptions = () => {
    choices.forEach(choice => {
      choice.addEventListener("click", e => {
        if (!isAvailable) return;

        // Lock actions and verify answer
        isAvailable = false;
        const chosenOption = e.target.dataset["number"];

        if (chosenOption == currentQuestion.correctAnswer) {
          score += CORRECT_BONUS;
          points.innerText = score;
        }

        getNewQuestion();
      });
    });
  };

  startGame();
})();
