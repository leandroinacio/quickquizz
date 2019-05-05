(function() {
  // Page elements
  const username = document.getElementById("username");
  const submitBtn = document.getElementById("submit");
  const score = document.getElementById("final-score");

  // Basic values
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const finalScore = localStorage.getItem("score");

  // Add events
  username.addEventListener("keyup", e => {
    submitBtn.disabled = !e.target.value;
  });

  saveHighScore = e => {
    e.preventDefault();

    const score = {
      score: finalScore,
      name: username.value
    };

    // Get the highest scores by adding it to the list, sorting and removing the last positions
    highScores.push(score);
    highScores.sort((a, b) => {
      b.score - a.score;
    });
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
  };

  initPage = () => {
    score.innerText = `Final Score: ${finalScore}`;
  };

  initPage();
})();
