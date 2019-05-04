(function() {
  // DOM elements
  const question = document.getElementById("question");
  const questionNumber = document.getElementById("question-number");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const scoreLabel = document.getElementById("score");
  const progressBar = document.getElementById("progress-bar");

  // Classes
  const rightAnswerClass = "correct";
  const incorrectAnswerClass = "incorrect";

  // Basic variables structue
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
    },
    {
      question: "What is the currency used in Brazil?",
      options: ["Dolars", "Euros", "Pesos", "Reais"],
      correctAnswer: 3
    }
  ];
  let score = 0;
  let questionCounter = 0;
  const CORRECT_BONUS = 10;

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

    // Get new question and update labels
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    questionNumber.innerText = `Question ${questionCounter}/${
      questions.length
    }`;
    progressBar.style.width = `${(questionCounter / questions.length) * 100}%`;

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

        let classToApply = incorrectAnswerClass;
        if (chosenOption == currentQuestion.correctAnswer) {
          score += CORRECT_BONUS;
          scoreLabel.innerText = score;
          classToApply = rightAnswerClass;
          localStorage.setItem("score", score);
        }

        // Show option result and get new question
        e.target.parentElement.classList.add(classToApply);
        setTimeout(() => {
          e.target.parentElement.classList.remove(classToApply);
          getNewQuestion();
        }, 1000);
      });
    });
  };

  startGame();
})();
