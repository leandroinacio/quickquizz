(function() {
  // Page elements
  const highScoreList = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresElement = document.getElementById("high-scores");

  initPage = () => {
    highScoresElement.innerHTML = highScoreList
      .map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
      })
      .join("");
  };

  initPage();
})();
