(function() {
  // DOM elements
  const question = document.getElementById("question");
  const questionNumber = document.getElementById("question-number");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const scoreLabel = document.getElementById("score");
  const progressBar = document.getElementById("progress-bar");
  const loader = document.getElementById("loader");
  const quiz = document.getElementById("quiz");

  // Classes
  const rightAnswerClass = "correct";
  const incorrectAnswerClass = "incorrect";

  // Basic variables structure
  let currentQuestion;
  let isAvailable = false;
  let questions = [];
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

    loader.classList.add("hidden");
    quiz.classList.remove("hidden");
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
    question.innerHTML = currentQuestion.question;
    questionNumber.innerText = `Question ${questionCounter}/${
      questions.length
    }`;
    progressBar.style.width = `${(questionCounter / questions.length) * 100}%`;

    choices.map(choice => {
      const number = choice.dataset["number"];
      choice.innerHTML = currentQuestion.options[number];
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

  fetchQuestions = () => {
    // Fetch the questions and expect a json
    loader.classList.remove("hidden");
    quiz.classList.add("hidden");
    fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
      .then(res => {
        return res.json();
      })
      .then(loadedQuestions => {
        // Setup questions to return the object we are using
        questions = loadedQuestions.results.map(unformattedQuestion => {
          const correctOptionPosition = Math.floor(Math.random() * 4);
          let opt = unformattedQuestion.incorrect_answers;
          opt.splice(
            correctOptionPosition,
            0,
            unformattedQuestion.correct_answer
          );

          return {
            question: unformattedQuestion.question,
            options: opt,
            correctAnswer: correctOptionPosition
          };
        });

        // Start the game with the questions retrieved
        startGame();
      })
      .catch(err => console.log(err));
  };

  fetchQuestions();
})();
